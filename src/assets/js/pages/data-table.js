/* //[Data Table Javascript]



//Project:	NEEV MITRA - Responsive Admin Template

//Primary use:   Used only for the Data Table



$(function () {

    "use strict";



    $('#example1').DataTable();

    $('#example2').DataTable({

      'paging'      : true,

      'lengthChange': false,

      'searching'   : false,

      'ordering'    : true,

      'info'        : true,

      'autoWidth'   : false

    });

	

	

	$('#example').DataTable( {

		dom: 'Bfrtip',

		buttons: [

			'copy', 'csv', 'excel', 'pdf', 'print'

		]

	} );

	

	$('#tickets').DataTable({

	  'paging'      : true,

	  'lengthChange': false,

	  'searching'   : false,

	  'ordering'    : true,

	  'info'        : true,

	  'autoWidth'   : false,

	});

	

	$('#productorder').DataTable({

	  'paging'      : true,

	  'lengthChange': true,

	  'searching'   : true,

	  'ordering'    : true,

	  'info'        : true,

	  'autoWidth'   : false,

	});

	

	//--------Individual column searching

	

    // Setup - add a text input to each footer cell

    $('#example5 tfoot th').each( function () {

        var title = $(this).text();

        $(this).html( '<input type="text" placeholder="Search '+title+'" />' );

    } );

 

    // DataTable

    var table = $('#example5').DataTable();

 

    // Apply the search

    table.columns().every( function () {

        var that = this;

 

        $( 'input', this.footer() ).on( 'keyup change', function () {

            if ( that.search() !== this.value ) {

                that

                    .search( this.value )

                    .draw();

            }

        } );

    } );

	

	

	//---------------Form inputs
	var table = $('#example6').DataTable();


    

	

	

	

	

  }); // End of use strict

  
 */

  var dataTable;
  var dataTable2;
  function setDataTable(){
    //alert("hi");
      //window.onload = function(){
    dataTable = $('.as-data-table').DataTable( {

		dom: 'Bfrtip',

		buttons: [

			'copy', 'csv', 'excel', 'pdf', 'print'

		]

    });
    
    //alert("updated");
    dataTable2=  $('.as-data-table-2').DataTable( {

      dom: 'Bfrtip',

      buttons: [
        'copy'
      ]

  } );

//}
  }


  function select2Fn(){
    //window.onload = function(){
      //alert(";load");
      $('.select2').select2();
   // }
  }


  function fixSize(){
    document.body.style.height ='auto';
  }

  function reInitializeDB(){
      //console.log(dataTable);
      dataTable.destroy();
      //setDataTable();
  }