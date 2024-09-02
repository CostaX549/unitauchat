import React from 'react'

const Footer = () => {
  return (
    <div className="gpt3__footer section__padding">
      <div className="gpt3__footer-heading">
        <h1 className="gradient__text">Você quer estar um passo à frente no futuro?</h1>
      </div>
      <div className="gpt3__footer-btn">
        <p>Solicite Acesso Antecipado</p>
      </div>
      <div className="gpt3__footer-links">
        <div className="gpt3__footer-links_logo">
          <img src="/assets/unitau (1).png" alt="logo" />
          <p>Universidade de Taubaté, All Rights Reserved</p>
        </div>
        <div className="gpt3__footer-links_div">
          <h4>Links</h4>
          <p>Sobre Nós</p>
          <p>Redes Sociais</p>
          <p>Contadores</p>
          <p>Contato</p>
        </div>
        <div className="gpt3__footer-links_div">
          <h4>Empresa</h4>
          <p>Termos & Condições</p>
          <p>Política de Privacidade</p>
          <p>Contato</p>
        </div>
        <div className="gpt3__footer-links_div">
          <h4>Entre em contato</h4>
          <p>Universidade de Taubaté</p>
          <p>+55 (12) 3625-4100</p>
          <p>contato@unitau.br</p>
        </div>
      </div>
      <div className="gpt3__footer-copyright">
        <p>© 2024 Universidade de Taubaté. Todos os direitos reservados.</p>
      </div>
    </div>
  )
}

export default Footer
