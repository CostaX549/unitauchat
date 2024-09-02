import React, { useEffect, useRef, useState } from 'react';
import { usePage } from '@inertiajs/react';
import Peer from 'peerjs';

const Meeting = () => {
  const { auth } = usePage().props;
  const [peers, setPeers] = useState({});
  const videoGridRef = useRef(null);

  useEffect(() => {
    const peer = new Peer();
    let userStream = null;

    // Função para adicionar um vídeo à grade de vídeos junto com o nome do usuário
    function addVideoStream(video, stream, userName) {
      const videoWrapper = document.createElement('div');
      const nameTag = document.createElement('div');
      nameTag.innerText = userName;
      nameTag.className = 'text-white bg-black opacity-75 p-1';

      video.srcObject = stream;
      video.addEventListener('loadedmetadata', () => {
        video.play();
      });

      videoWrapper.append(video);
      videoWrapper.append(nameTag);
      videoWrapper.className = 'relative flex flex-col items-center';
      videoGridRef.current.append(videoWrapper);
    }

    // Função para conectar-se a novos usuários
    function connectToNewUser(userId, userName, stream) {
      const call = peer.call(userId, stream);
      const video = document.createElement('video');
      call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream, userName);
      });
      call.on('close', () => {
        video.parentElement.remove();
      });
      setPeers(prevPeers => ({ ...prevPeers, [userId]: call }));
    }

    // Quando o PeerJS estiver pronto
    peer.on('open', id => {
      console.log('Meu Peer ID é:', id);

      Echo.join('meeting')
        .here(users => {
          users.forEach(user => {
            connectToNewUser(user.peerId, user.name, userStream);
          });
        })
        .joining(user => {
          connectToNewUser(user.peerId, user.name, userStream);
        })
        .leaving(user => {
          if (peers[user.peerId]) {
            peers[user.peerId].close();
            const updatedPeers = { ...peers };
            delete updatedPeers[user.peerId];
            setPeers(updatedPeers);
          }
        });
    });

    // Recebe uma chamada de outro peer
    peer.on('call', call => {
      navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      }).then(stream => {
        userStream = stream;
        call.answer(stream);
        const video = document.createElement('video');
        call.on('stream', userVideoStream => {
          addVideoStream(video, userVideoStream, 'Outro Participante');
        });
      }).catch(error => {
        console.error('Erro ao obter o stream do usuário:', error);
      });
    });

    // Obtém o próprio stream de vídeo/áudio
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then(stream => {
      const myVideo = document.createElement('video');
      myVideo.muted = true;
      addVideoStream(myVideo, stream, auth.user.name);
      userStream = stream;
      Echo.join('meeting')
        .here(users => {
          users.forEach(user => {
            connectToNewUser(user.peerId, user.name, stream);
          });
        })
        .joining(user => {
          connectToNewUser(user.peerId, user.name, stream);
        });
    }).catch(error => {
      console.error('Erro ao obter o stream do usuário:', error);
    });

    return () => {
      peer.destroy();
    };
  }, [auth.user.id]);

  return (
    <div>
      <h2>Meeting</h2>
      <div ref={videoGridRef} id="video-grid" className="grid grid-cols-2 gap-2"></div>
    </div>
  );
}

export default Meeting;
