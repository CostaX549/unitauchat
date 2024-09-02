<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GroupTarefaAttachment extends Model
{
    use HasFactory;

    protected $fillable = ['tarefa_id', 'name', 'mime', 'size', 'path'];

    protected $table = 'group_tarefa_attachments';
    
}
