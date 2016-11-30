<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Wechselgeldrechner</title>
    
    <link rel="stylesheet" type="text/css" href="jquery/jquery.mobile-1.4.4.css"/>
    <link rel="stylesheet" type="text/css" href="cashcounter.css">
    <script src="jquery/jquery.1.11.1.js"></script>
    <script src="jquery/jquery.mobile-1.4.4.js"></script>
    <script src="cashcounter.js"></script>
        
    <script>
	$( document ).ready(function() {
	  $(".outer-wrap").cashcounter();	
	});
    </script>
    
  </head>
  
  <body>
   <!-- page -->
    <section data-role="page" id="common">
     
      <!-- header -->
      <header data-role="header" data-theme="b">
        <h1>Wechselgeld-Rechner  /  Tagesabschluss</h1>
        
        <!-- navbar -->
        <div data-role="navbar" data-iconpos="left" >
          <ul>
            <li><a href="pages/common.php#common" data-icon="grid" class="ui-btn-active">Tagesabschluss</a></li>
            <li><a href="pages/common.php#archiv" data-icon="calendar">Archiv-Daten</a></li>
            <li><a href="pages/common.php#settings" data-icon="gear">Einstellungen</a></li>
          </ul>
        </div><!-- /navbar -->  
        
      </header><!-- /header -->
      
      <!-- content -->
      <div role="main" class="ui-content ">
        <div class="outer-wrap"></div>
      </div><!-- /content -->
      
    </section><!-- /page -->
    
 <!-- page -->
    <section data-role="page" id="preview">
     
      <!-- header -->
      <header data-role="header">
        <h1>Tagesabschluss Vorschau</h1>
        
        <!-- navbar -->
        <div data-role="navbar" data-iconpos="left">
          <ul>
            <li><a href="pages/common.php#common" data-icon="grid" class="ui-btn-active">Tagesabschluss</a></li>
            <li><a href="pages/common.php#archiv" data-icon="calendar">Archiv-Daten</a></li>
            <li><a href="pages/common.php#settings" data-icon="gear">Einstellungen</a></li>
          </ul>
        </div><!-- /navbar -->  
        
      </header><!-- /header -->
      
      <!-- content -->
      <div role="main" class="ui-content ">
        <div class="print-head">Tagesabschluss: <?php echo date("d.M.Y"); ?></div>
        <br>
		<table width="100%" border="0" align="center"  cellpadding="0" cellspacing="0">
          <tr>
            <th align="left">Kassen</th>
            <th align="center">500,00 €</th>
            <th align="center">200,00 €</th>
            <th align="center">100,00 €</th>
            <th align="center">50,00 €</th>
            <th align="center">20,00 €</th>
            <th align="center">10,00 €</th>
            <th align="center">5,00 €</th>
            <th align="center">2,00 €</th>
            <th align="center">1,00 €</th>
            <th align="center">0,50 €</th>
            <th align="center">0,20 €</th>
            <th align="center">0,10 €</th>
            <th align="center">0,05 €</th>
            <th align="center">0,02 €</th>
            <th align="center">0,01 €</th>
          </tr>
          <tr>
            <td>Kasse 1</td>
            <td align="center">6</td>
            <td align="center">3</td>
            <td align="center">88</td>
            <td align="center">5</td>
            <td align="center">4</td>
            <td align="center">1</td>
            <td align="center">4</td>
            <td align="center">99</td>
            <td align="center">456</td>
            <td align="center">352</td>
            <td align="center">643</td>
            <td align="center">2383</td>
            <td align="center">94</td>
            <td align="center">23</td>
            <td align="center">34</td>
          </tr>
          <tr>
            <td>Kasse 2</td>
            <td align="center"> &nbsp;&nbsp;&nbsp;&nbsp; 6</td>
            <td align="center">3</td>
            <td align="center">88</td>
            <td align="center">5</td>
            <td align="center">4</td>
            <td align="center">1</td>
            <td align="center">4</td>
            <td align="center">99</td>
            <td align="center">456</td>
            <td align="center">352</td>
            <td align="center">643</td>
            <td align="center">2383</td>
            <td align="center">94</td>
            <td align="center">23</td>
            <td align="center">34</td>
          </tr>
        </table>

      </div><!-- /content -->
      
    </section><!-- /page -->
  </body>
</html>