var domaintableData = [
    {id:1, name:"simpleishard.org", age:"12", gender:"male", height:1, col:"red", dob:"", cheese:1},
    {id:2, name:"elegantcontext.com", age:"1", gender:"female", height:2, col:"blue", dob:"14/05/1982", cheese:true},
    {id:3, name:"datafieldguide.com", age:"1", gender:"female", height:2, col:"blue", dob:"14/05/1982", cheese:true},
    {id:4, name:"unlearnlife.com", age:"1", gender:"female", height:2, col:"blue", dob:"14/05/1982", cheese:true},
    {id:5, name:"yeahbuthow.com", age:"1", gender:"female", height:2, col:"blue", dob:"14/05/1982", cheese:true},
]

// var domain_table = new Tabulator("#domain-table", {
// 	data:domaintableData,           //load row data from array
// 	layout:"fitColumns",      //fit columns to width of table
// 	responsiveLayout:"hide",  //hide columns that dont fit on the table
// 	tooltips:true,            //show tool tips on cells
// 	addRowPos:"top",          //when adding a new row, add it to the top of the table
// 	history:true,             //allow undo and redo actions on the table
// 	// pagination:"local",       //paginate the data
// 	paginationSize:7,         //allow 7 rows per page of data
// 	movableColumns:true,      //allow column order to be changed
// 	resizableRows:true,       //allow row order to be changed
// 	initialSort:[             //set the initial sort order of the data
// 		{column:"id", dir:"asc"},
// 	],
// 	columns:[                 //define the table columns
//     {title:"#", field:"id", editor:"input"},
// 		{title:"Name", field:"name", editor:"input"},
// 		{title:"Task Progress", field:"progress", align:"left", formatter:"progress", editor:true},
// 		{title:"Gender", field:"gender", width:95, editor:"select", editorParams:{values:["male", "female"]}},
// 		{title:"Rating", field:"rating", formatter:"star", align:"center", width:100, editor:true},
// 		{title:"Color", field:"col", width:130, editor:"input"},
// 		{title:"Date Of Birth", field:"dob", width:130, sorter:"date", align:"center"},
// 		{title:"Driver", field:"car", width:90,  align:"center", formatter:"tickCross", sorter:"boolean", editor:true},
// 	],
// });

var domain_table = new Tabulator("#domain-table", {
	data:domaintableData,           //load row data from array
	layout:"fitColumns",      //fit columns to width of table
	responsiveLayout:"hide",  //hide columns that dont fit on the table
	tooltips:true,            //show tool tips on cells
	addRowPos:"top",          //when adding a new row, add it to the top of the table
	history:true,             //allow undo and redo actions on the table
	// pagination:"local",       //paginate the data
	paginationSize:7,         //allow 7 rows per page of data
	movableColumns:true,      //allow column order to be changed
	resizableRows:true,       //allow row order to be changed
	initialSort:[             //set the initial sort order of the data
		{column:"id", dir:"asc"},
	],
	columns:[                 //define the table columns
    {title:"#", field:"id"},
		{title:"Name", field:"name", editor:"input"},
		{title:"Task Progress", field:"progress", align:"left", formatter:"progress", editor:true},
		{title:"Gender", field:"gender", width:95, editor:"select", editorParams:{values:["male", "female"]}},
		{title:"Rating", field:"rating", formatter:"star", align:"center", width:100, editor:true},
		{title:"Color", field:"col", width:130, editor:"input"},
		{title:"Date Of Birth", field:"dob", width:130, sorter:"date", align:"center"},
		{title:"Driver", field:"car", width:90,  align:"center", formatter:"tickCross", sorter:"boolean", editor:true},
	],
});
