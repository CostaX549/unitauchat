<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class GroupTarefa extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'start_date', 'end_date', 'group_id'];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime'
    ];

    protected $appends = [
        'enviosUser',
        'enviou'
    ];

   


    public function group() {
        return $this->belongsTo(Group::class, "group_id");
    }

    public function attachments() {
        return $this->hasMany(GroupTarefaAttachment::class, "tarefa_id");
    }
    public function envios() {
        return $this->hasMany(GroupTarefaEnvio::class, "tarefa_id");
    }

  

    public function getEnviosUserAttribute()
    {
        $userId = Auth::id();
        // Inclui registros "soft deleted" usando withTrashed()
        $envios = $this->envios()->withTrashed()->where('user_id', $userId)->first();
        return $envios ?: null;
    }
    
    public function getEnviouAttribute()
    {
        $userId = Auth::id();
      
        return $this->envios()->where('user_id', $userId)->exists();
    }

   
}
