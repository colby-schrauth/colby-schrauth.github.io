var tableData = [
    {id:1, name:"The Ruthless Elimination of Hurry", author:"John Mark Comer", why:"Fantastic ideas for slowing down"},
    {id:2, name:"Barbarian Days", author:"William Finnegan", why:"Just an awesome story, and very well written"},
    {id:3, name:"Naked Statistics", author:"Charles Wheelan", why:"Such a fantastic approach to breaking down complexity"},
    {id:4, name:"Fit for Life", author:"Harvey and Marilyn Diamond", why:"Incredibly surprising, yet rational things about food"},
    {id:5, name:"This is Marketing", author:"Seth Godin", why:"Motivation for becoming a creator"},
    {id:6, name:"Steve Jobs", author:"Walter Isaacson", why:"Always been a huge fan of Steven Jobs"},
    {id:7, name:"Start with Why", author:"Simon Sinek", why:"This TED Talk deeply inspired me for many years, and still does"},
    {id:8, name:"Zen and the Art of Motorcycle Maintenance", author:"Robert Pirsig", why:"Ignorance isn't always bliss"},
    {id:9, name:"Iron John", author:"Robert Bly", why:"A fun read about the current state of masculinity"},
  {id:10, name:"Ishmael", author:"Daniel Quinn", why:"Makes you think pretty damn hard"},
]

var table = new Tabulator("#book-list", {
	data:tableData,           //load row data from array
	layout:"fitColumns",      //fit columns to width of table
	responsiveLayout:"hide",  //hide columns that dont fit on the table
	tooltips:true,            //show tool tips on cells
	addRowPos:"top",          //when adding a new row, add it to the top of the table
	history:true,             //allow undo and redo actions on the table
	// pagination:"local",       //paginate the data
	paginationSize:10,         //allow 7 rows per page of data
	movableColumns:true,      //allow column order to be changed
	resizableRows:true,       //allow row order to be changed
	initialSort:[             //set the initial sort order of the data
		{column:"id", dir:"asc"},
	],
	columns:[                 //define the table columns
    {title:"#", field:"id", width:50},
		{title:"Name", field:"name", width:300},
    {title:"Author", field:"author", width:200},
		{title:"Why", field:"why"},
	],
});
