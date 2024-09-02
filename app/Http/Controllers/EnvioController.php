<?php

namespace App\Http\Controllers;

use App\Http\Resources\EnvioResource;
use App\Models\GroupTarefa;
use App\Models\GroupTarefaEnvio;
use App\Models\GroupTarefaEnvioAttachment;
use App\Http\Resources\EnvioAttachmentResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class EnvioController extends Controller
{
    public function enviar(GroupTarefa $tarefa, Request $request) {

        $data = $request->validate([
            'attachments' => 'nullable|array|max:10',
            'attachments.*' => 'file|max:1024000',
            'descricao' => 'required_if:attachments,null'
        ]);
    
        $files = $data['attachments'] ?? [];
        $envio = $tarefa->envios()->where('user_id', auth()->id())->withTrashed()->first();
    
        if ($envio) {
         
            $envio->created_at = now();
            $envio->descricao = $request->descricao;
            $envio->restore();
            $envio->save();
    
         
        } else {
         
            $data['tarefa_id'] = $tarefa->id;
            $data['user_id'] = auth()->id();
            $envio = GroupTarefaEnvio::create($data);
        }
    
        // Handle new attachments
        $attachments = [];
        if ($files) {
            foreach ($files as $file) {
                $directory = 'attachments/' . Str::random(32);
                Storage::makeDirectory($directory);
                $path = $file->store($directory, 'public');
                $attachment = GroupTarefaEnvioAttachment::create([
                    'envio_id' => $envio->id,
                    'name' => $file->getClientOriginalName(),
                    'mime' => $file->getClientMimeType(),
                    'size' => $file->getSize(),
                    'path' => $path
                ]);
                $attachments[] = $attachment;
            }
        }
    
   
     


    
        return response()->json([
            'enviou' => $tarefa->enviou,
            'envio' => new EnvioResource($envio),
         
            
        ]);
    }

    public function destroy(GroupTarefaEnvio $envio) {
      

         $envio->delete();
         $tarefa = $envio->tarefa;
      
        return response()->json(['enviou' => $tarefa->enviou ]);
    }

    public function deletarArquivo($id) {
      
        $attachment = GroupTarefaEnvioAttachment::findOrFail($id);
        $dir = dirname($attachment->path);
        Storage::disk('public')->deleteDirectory($dir);
        $attachment->delete();
       }
}
