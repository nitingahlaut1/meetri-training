let objectsArray = [
    {
        "id": "dc0a8b20-5864-4e44-a4ec-aa775a5a2b7d",
        "title": "folder3",
        "icon_id": null,
        "meta_info": null,
        "workspace_id": "67beb452-2f8e-4424-bb00-8a1f1cad10fc",
        "parent_id_id": null,
        "created_by": null,
        "updated_by": null,
        "created_at": null,
        "updated_at": null,
        "children": [
            {
                "id": "3c2e31d8-0307-4d7e-abae-08c347ca5d9b",
                "title": "nested folder1",
                "icon_id": null,
                "meta_info": null,
                "workspace_id": "67beb452-2f8e-4424-bb00-8a1f1cad10fc",
                "parent_id_id": "dc0a8b20-5864-4e44-a4ec-aa775a5a2b7d",
                "created_by": null,
                "updated_by": null,
                "created_at": null,
                "updated_at": null
            }
        ]
    },
    {
        "id": "cbbf7a5a-456b-4ec1-8282-c92185f3a5e9",
        "title": "folder1",
        "icon_id": null,
        "meta_info": {
            "sidebar_info": {
                "0d6018a5-59ea-4895-a814-63617a937946": 1,
                "2cde7d26-fd35-4585-83f6-3aacb6c967c0": 2,
                "a53157f8-ca15-4c9e-bb9a-5c55b3fdc3f9": 3,
                "37aff80e-2424-48fa-9a61-7cc399fc9b15": 4,
                "493d68b9-db49-485b-8dfa-cfc663266c61": 6
            }
        },
        "workspace_id": "67beb452-2f8e-4424-bb00-8a1f1cad10fc",
        "parent_id_id": null,
        "created_by": null,
        "updated_by": null,
        "created_at": null,
        "updated_at": null,
        "children": [
            {
                "id": "2cde7d26-fd35-4585-83f6-3aacb6c967c0",
                "title": "file2",
                "icon_id": null,
                "data": null,
                "meta_info": null,
                "workspace_id": "67beb452-2f8e-4424-bb00-8a1f1cad10fc",
                "status": "UNPUBLISHED",
                "folder_id": "cbbf7a5a-456b-4ec1-8282-c92185f3a5e9",
                "created_at": null,
                "updated_by": null,
                "updated_at": null,
                "created_by": null
            },
            {
                "id": "a53157f8-ca15-4c9e-bb9a-5c55b3fdc3f9",
                "title": "file4",
                "icon_id": null,
                "data": null,
                "meta_info": null,
                "workspace_id": "67beb452-2f8e-4424-bb00-8a1f1cad10fc",
                "status": "UNPUBLISHED",
                "folder_id": "cbbf7a5a-456b-4ec1-8282-c92185f3a5e9",
                "created_at": null,
                "updated_by": null,
                "updated_at": null,
                "created_by": null
            },
            {
                "id": "37aff80e-2424-48fa-9a61-7cc399fc9b15",
                "title": "file6",
                "icon_id": null,
                "data": null,
                "meta_info": null,
                "workspace_id": "67beb452-2f8e-4424-bb00-8a1f1cad10fc",
                "status": "UNPUBLISHED",
                "folder_id": "cbbf7a5a-456b-4ec1-8282-c92185f3a5e9",
                "created_at": null,
                "updated_by": null,
                "updated_at": null,
                "created_by": null
            },
            {
                "id": "493d68b9-db49-485b-8dfa-cfc663266c61",
                "title": "test5",
                "icon_id": null,
                "data": null,
                "meta_info": null,
                "workspace_id": "67beb452-2f8e-4424-bb00-8a1f1cad10fc",
                "status": "UNPUBLISHED",
                "folder_id": "cbbf7a5a-456b-4ec1-8282-c92185f3a5e9",
                "created_at": null,
                "updated_by": null,
                "updated_at": null,
                "created_by": null
            }
        ]
    },
    {
        "id": "43154706-cf70-4abe-a67b-4dc10629addf",
        "title": "folder2",
        "icon_id": null,
        "meta_info": null,
        "workspace_id": "67beb452-2f8e-4424-bb00-8a1f1cad10fc",
        "parent_id_id": null,
        "created_by": null,
        "updated_by": null,
        "created_at": null,
        "updated_at": null
    },
    {
        "id": "e46e9ce7-6995-4887-8a90-8a2f01003ff1",
        "title": "test7",
        "icon_id": null,
        "data": null,
        "meta_info": null,
        "workspace_id": "67beb452-2f8e-4424-bb00-8a1f1cad10fc",
        "status": "UNPUBLISHED",
        "folder_id": null,
        "created_at": null,
        "updated_by": null,
        "updated_at": null,
        "created_by": null
    }
];

function addChildren(objectsArray, parentId, newChild) {
    for (let obj of objectsArray) {
        if (obj.id === parentId) {
            if (!obj.children || obj.children.length === 0) {
                
                if (!obj.children) {
                    obj.children = [];
                }
                
                obj.children.push(newChild);
                return true; 
            }
            return false; 
        }

        
        if (obj.children && obj.children.length > 0) {
            let childAdded = addChildren(obj.children, parentId, newChild);
            if (childAdded) return true;
        }
    }
    return false; 
}



let newChild = {
    id: "new-child-id",
    title: "new child"
};

let parentId = "43154706-cf70-4abe-a67b-4dc10629addf";

let result = addChildren(objectsArray, parentId, newChild);

console.log(result ? "Child added successfully" : "Child not added");
console.log(JSON.stringify(objectsArray, null, 2));
