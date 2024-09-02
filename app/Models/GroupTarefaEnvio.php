<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class GroupTarefaEnvio extends Model
{
    use SoftDeletes, HasFactory;

    protected $fillable = ['descricao', 'tarefa_id', 'user_id'];

    public function attachments() {
        return $this->hasMany(GroupTarefaEnvioAttachment::class, "envio_id");
    }

    public function tarefa() {
        return $this->belongsTo(GroupTarefa::class, "tarefa_id");
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

}
