

import GroupItem from '@/Components/App/GroupItem';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';


 function Grupos({ groups }) {
  
   

    return (
     
<div className="overflow-auto">
 
        {groups.data.length > 0 && (
         <>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 m-5 ">
                    {groups.data.map((group) => (
                        <GroupItem group={group} key={group.id} />
                    ))}
                </div>
         </>
        )}

</div>



      
    );
}

Grupos.layout = (page) => {
    return (
        
        <AuthenticatedLayout
        user={page.props.auth.user}
    
        
        >
            {page}
        </AuthenticatedLayout>
        
    )
}

export default Grupos;