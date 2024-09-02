<?php

use App\Http\Controllers\EnvioController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\TarefaController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MeetingController;

Route::middleware(['auth', 'verified', 'active'])->group(function() {
    Route::get('/conversations', [HomeController::class, 'home'])->name('dashboard');
    Route::get('/equipes', [GroupController::class, 'index'])->name('home');
    Route::get('user/{user}', [MessageController::class, 'byUser'])->name('chat.user');
    Route::get('group/{group}', [MessageController::class, 'byGroup'])->name('chat.group');
    Route::post('/message', [MessageController::class, 'store'])->name('message.store');
    Route::delete('/message/{message}', [MessageController::class, 'destroy'])->name('message.destroy');
    Route::get('/message/older/{message}', [MessageController::class, 'loadOlder'])->name('message.loadOlder');
    Route::post('/group', [GroupController::class, 'store'])->name('group.store');
    Route::put('/group/{group}', [GroupController::class, 'update'])->name('group.update');
    Route::delete('/group/{group}', [GroupController::class, 'destroy'])->name('group.destroy');
    Route::get('/meeting', [MeetingController::class, 'index'])->name('meeting.index');
    Route::get('/group/{group}/tarefas', [TarefaController::class, 'index'])->name('group.tarefas');
    Route::get('/group/{group}/tarefas/{tarefa}', [TarefaController::class, 'show'])->name('group.tarefa');
    Route::post('/edit/{tarefa}', [TarefaController::class, 'update'])->name('tarefa.edit');
    Route::post('/group/{group}/tarefas', [TarefaController::class, 'store'])->name('group.tarefas.store');
    Route::post('/enviar/{tarefa}', [EnvioController::class, 'enviar'])->name('envio.store');
    Route::delete('/envio/destroy/{envio}', [EnvioController::class, 'destroy'])->name('envio.destroy');
    Route::delete('/deletar/{tarefaAttachment}', [TarefaController::class, 'deletarArquivo'])->name('tarefa.attachment.delete');
    Route::delete('/deletarEnvio/{envioAttachment}', [EnvioController::class, 'deletarArquivo'])->name('envio.attachment.delete');
    Route::middleware(['admin'])->group(function() {
        Route::post('/user', [UserController::class, 'store'])->name('user.store');
        Route::post('/user/change-role/{user}', [UserController::class, 'changeRole'])->name('user.changeRole');
        Route::post('/user/block-unblock/{user}', [UserController::class, 'blockUnblock'])->name('user.blockUnblock');
    });
});

Route::get('/', [HomeController::class, 'landingPage']);



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
