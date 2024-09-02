import React from 'react'
import { Article } from '@/Components'

const Blog = () => {
  return (
    <div className="gpt3__blog section__padding" id="blog">
      <div className="gpt3__blog-heading">
        <h1 className="gradient__text">Novidades do UnitauChat: Seu aplicativo de gerenciamento para a Universidade de Taubaté</h1>
      </div>
      <div className="gpt3__blog-container">
        <div className="gpt3__blog-container_groupA">
          <Article 
            imgUrl="/assets/blog01.png" 
            date="Ago 22, 2024"  
            title="Conheça o UnitauChat: O novo aplicativo de gerenciamento para alunos da Universidade de Taubaté" 
          />
        </div>
        <div className="gpt3__blog-container_groupB">
          <Article 
            imgUrl="/assets/blog02.png" 
            date="Ago 15, 2024" 
            title="Principais funcionalidades do UnitauChat: Organize suas tarefas e comunique-se com eficiência" 
          />
          <Article 
            imgUrl="/assets/blog03.png" 
            date="Ago 10, 2024" 
            title="Atualizações recentes no UnitauChat: Novas ferramentas para ajudar na sua jornada acadêmica" 
          />
          <Article 
            imgUrl="/assets/blog04.png" 
            date="Ago 05, 2024" 
            title="Feedback dos usuários: O que os alunos estão dizendo sobre o UnitauChat" 
          />
          <Article 
            imgUrl="/assets/blog05.png" 
            date="Jul 30, 2024" 
            title="Dicas e truques para aproveitar ao máximo o UnitauChat" 
          />
        </div>
      </div>
    </div>
  )
}

export default Blog
