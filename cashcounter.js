(function($) {	
 
  /*
  ** @widget cashcounter
  */	
  $.widget("msc.cashcounter", {
	
	/*
	** @var object options
	*/	 
	options: {
	  ec_terminal:      true	,
	  cash_terminals:   ["Kasse 1", "Kasse 2"],	
	  tele_terminals:   ["Girocard", "ELV-Plus", "ELV-Offline"],
	  credit_terminals: ["Mastercard", "Visa", "Maestro", "Am. Expr."]		
	},
	
	/*
	** @var object cashdata
	*/
	cashdata: {},
	
	/*
	** @function _create
	*/
	_create: function() { 
	  this._getCashData();
	  this._buildHtml();
	  this._bindEvents();
	},
	

	/*
	** @function _buildHtml
	*/
	_buildHtml: function() {
	  // templates
	  var WrapperDiv      = $("<div/>").addClass("cash-wraper"),
	      MainDiv         = $("<div/>").addClass("cash-container"),
		  ContainerHeader = $("<div/>").addClass("cash-header").addClass("ui-body ui-body-b"),
	      HeaderTemplate  = $("<div/>").addClass("cash-container-header"),
		  ContentTemplate = $("<div/>").addClass("cash-container-content"),
		  ColumnTemplate  = $("<div/>").addClass("cash-container-column"),
		  SummaryTemplate = $("<div/>").addClass("cash-container-summary"),
		  CommonTemplate  = $("<div/>").addClass("cash-common"),
		  TerminalCashDiv = $("<div/>").addClass("cash-common-terminal"),
		  TerminalEcDiv   = $("<div/>").addClass("cash-common-ecterminal"),
		  SelectOptionTag = $("<select/>"),
		  CashInputTag    = $("<input/>");	
		   
	  // container
	  var MoneyContainer    = MainDiv.clone().addClass("ui-body ui-body-a"),
	      TelecashContainer = MainDiv.clone().addClass("ui-body ui-body-a").css("float","right"),
		  CreditsContainer  = MainDiv.clone().addClass("ui-body ui-body-a").css("float","right"),
		  SummaryContainer  = MainDiv.clone().addClass("ui-body ui-body-a").css("float","right");
	  
	  // header
	  var MoneyHeader    = HeaderTemplate.clone(),
	      TelecashHeader = HeaderTemplate.clone(),
		  CreditsHeader  = HeaderTemplate.clone(),
		  SummaryHeader  = HeaderTemplate.clone();
	
	  // content
	  var MoneyContent    = ContentTemplate.clone(),
	      TelecashContent = ContentTemplate.clone(),
	 	  CreditsContent  = ContentTemplate.clone(),
		  SummaryContent  = ContentTemplate.clone();
		  
	  // summaries
	  var MoneySummary    = SummaryTemplate.clone(),
	      TelecashSummary = SummaryTemplate.clone(),
		  CreditsSummary  = SummaryTemplate.clone(),
	      FinishSummary   = SummaryTemplate.clone();
	  
	  /* Header - Start */
	  /*----------------*/
	  var CurrentDate = new Date();
	 
	  ContainerHeader.append("Tagesabschluss ");
	  ContainerHeader.append(CurrentDate.getDate()+"."+(parseInt(CurrentDate.getMonth())+1)+"."+CurrentDate.getFullYear())
	  ContainerHeader.appendTo($(this.element));
	  
	  $.each(this.options.cash_terminals, function(Index, CashTerminal) {
		var CashOptionsContainer = CommonTemplate.clone().addClass("cash-options"),
		    CashOptionsSelector = SelectOptionTag.clone().attr("data-role", "none").attr("terminal", CashTerminal).addClass("main-option");
		
	    MoneyHeader.append( TerminalCashDiv.clone().html(CashTerminal) );  

		CashOptionsSelector.append($('<option/>').attr("value","count").html("Zählen"));
		CashOptionsSelector.append($('<option/>').attr("value","weigh").html("Wiegen"));	
		CashOptionsSelector.appendTo(CashOptionsContainer);
		CashOptionsContainer.appendTo(MoneyHeader);
	  });
	  
	  MoneyHeader.prepend( CommonTemplate.clone().html("Wert") );
	  MoneyHeader.append( CommonTemplate.clone().css({"text-align":"right","width":"90px"}).html("Summe") );	
	  
	  TelecashHeader.append( CommonTemplate.clone().css("text-align", "left").html("Telecash") );
	  TelecashHeader.append( CommonTemplate.clone().html(" ") );
	  
	  CreditsHeader.append( CommonTemplate.clone().css("text-align", "left").html("Kreditkarten") );
	  CreditsHeader.append( CommonTemplate.clone().html(" ") );
	  
	  SummaryHeader.append( CommonTemplate.clone().css("text-align", "left").html("Abschluss") )
	  SummaryHeader.append( CommonTemplate.clone().css("text-align", "right").html(" ") )
	  /*-----------------*/
	  
	  // append headers to containers
	  MoneyContainer.append(MoneyHeader);
	  TelecashContainer.append(TelecashHeader);
	  CreditsContainer.append(CreditsHeader);
	  SummaryContainer.append(SummaryHeader);
	  
	  /* Content - Start */
	  /*-----------------*/
	  $.each(this.cashdata, $.proxy(function(CashValue, CashOptions) {
	    var CashColumnContainer = ColumnTemplate.clone().attr("value", CashValue).attr("weight", CashOptions.weight).addClass("cash-column");
		
		CashColumnContainer.append( CommonTemplate.clone().html( this._replace(CashValue, ".", ",") ).append(' €') );
			
		$.each(this.options.cash_terminals, function(index, CashTerminal) {
		  var CashOptionsContainer = CommonTemplate.clone().addClass("cash-options"),
		      CashSelect = SelectOptionTag.clone().attr("data-role", "none").attr("terminal", CashTerminal).addClass("cash-option"),
		      CashInput  = CashInputTag.clone().attr({"terminal":CashTerminal,"data-role":"none","name":CashValue,"title":CashTerminal+" - "+CashValue}).addClass("cash-input cash-option-select"),
		      CashInput  = TerminalCashDiv.clone().html(CashInput);
		  
		  CashColumnContainer.append( CashInput );  
		  
		  if(CashOptions.weight != false) {
			CashSelect.append($('<option/>').attr("value","count").html("x"));
			CashSelect.append($('<option/>').attr("value","weigh").html("g ("+CashOptions.weight+")"));	
			CashSelect.appendTo(CashOptionsContainer);
			CashColumnContainer.append(CashOptionsContainer);
		  } else {
			CashColumnContainer.append( CommonTemplate.clone().addClass("cash-options").html("&nbsp;x") );
		  } 
		
		});

		CashColumnContainer.append( CommonTemplate.clone().addClass("summary").css({"text-align":"right","font-weight":"bold"}).html('0,00 €') );
	    CashColumnContainer.appendTo(MoneyContainer);
	  },this));
	  
	  $.each(this.options.tele_terminals, $.proxy(function(Index, TelecashTerminal) {
	    var TerminalColumnContainer = ColumnTemplate.clone(),
			TerminalInputTemplate   = CashInputTag.clone().attr({"data-role":"none","name":TelecashTerminal}).addClass("tele-input");
		
		TerminalColumnContainer.append( CommonTemplate.clone().html( TelecashTerminal ) );
		TerminalColumnContainer.append( TerminalEcDiv.clone().css("text-align", "right").addClass("tele-input").html(TerminalInputTemplate).append(' €') );
		TerminalColumnContainer.appendTo( TelecashContainer );
	  },this));
	  
	  $.each(this.options.credit_terminals, $.proxy(function(Index, CreditTerminal) {
	    var TerminalColumnContainer = ColumnTemplate.clone(),
		    TerminalInputTemplate   = CashInputTag.clone().attr({"data-role":"none","name":CreditTerminal}).addClass("credit-input"); 
		
		TerminalColumnContainer.append( CommonTemplate.clone().html( CreditTerminal ) );
		TerminalColumnContainer.append( TerminalEcDiv.clone().css("text-align", "right").addClass("credit-input").html(TerminalInputTemplate).append(' €') );
		TerminalColumnContainer.appendTo( CreditsContainer );
	  },this));
	  /*------------------*/ 
	  
	  /* Summaries - Start */
	  /*-------------------*/
	  var SummariesColumnContainerMoney = ColumnTemplate.clone(),
	      SummariesColumnContainerTelec = ColumnTemplate.clone(),
		  SummariesColumnContainerCredi = ColumnTemplate.clone();
	  
	  SummariesColumnContainerMoney.append( CommonTemplate.clone().html( "Bar" ) );
	  SummariesColumnContainerMoney.append( TerminalEcDiv.clone().addClass("moneysummaryall").css("text-align", "right").html('0,00 €') );
	  SummariesColumnContainerTelec.append( CommonTemplate.clone().html( "Telecash" ) );
	  SummariesColumnContainerTelec.append( TerminalEcDiv.clone().addClass("telecashsummaryall").css("text-align", "right").html('0,00 €') );
	  SummariesColumnContainerCredi.append( CommonTemplate.clone().html( "Kreditkarten" ) );
	  SummariesColumnContainerCredi.append( TerminalEcDiv.clone().addClass("creditsummaryall").css("text-align", "right").html('0,00 €') );
	  SummariesColumnContainerMoney.appendTo( SummaryContainer );
	  SummariesColumnContainerTelec.appendTo( SummaryContainer );
	  SummariesColumnContainerCredi.appendTo( SummaryContainer );
	  
	  MoneySummary.append( CommonTemplate.clone().css({"width":"250px","float":"left"}).html( "<b>Kassen Summe (Bar)</b>" ) );
	  MoneySummary.append( $("<div/>").addClass("moneysummary").css({"float":"right","padding-right":"5px","font-weight":"bold"}).html( "0,00 €" ) );
	  MoneyContainer.append( MoneySummary );
	  
	  TelecashSummary.append( $("<div/>").addClass("telesummary").css({"float":"right","padding-right":"5px","font-weight":"bold"}).html( "0,00 €" ) );
	  TelecashContainer.append( TelecashSummary );
	  
	  CreditsSummary.append( $("<div/>").addClass("creditsummary").css({"float":"right","padding-right":"5px","font-weight":"bold"}).html( "0,00 €" ) );
	  CreditsContainer.append( CreditsSummary );
	  
	  FinishSummary.append( $("<div/>").addClass("allsummary").css({"float":"right","padding-right":"5px","font-weight":"bold"}).html( "0,00 €" ) );
	  SummaryContainer.append( FinishSummary );
	  /*-------------------*/ 
	  
	  
	  /* Cash to Bank - Start */
	  /*--------------*/	
	  var CashToBankColumn = ColumnTemplate.clone().addClass("border-top").css({"height":"24px"}),
	      CashToBankInput  = CashInputTag.clone().attr({"data-role":"none","name":"cashtobank"}).addClass("cash-to-bank");
	    
	  CashToBankColumn.append( CommonTemplate.clone().css({"width":"150px","padding-top":"2px"}).html('<b>Kasse an Bank (Bar)</b>'));
	  CashToBankColumn.append( TerminalCashDiv.clone().css({"float":"right","width":"90px","text-align":"right","font-weight":"bold"}).html(CashToBankInput).append(' €'));
	  
	  MoneyContainer.append( CashToBankColumn );
	  /*--------------*/
	  
	  // append containers to element
	  MoneyContainer.appendTo($(this.element));
	  TelecashContainer.appendTo($(this.element));
	  CreditsContainer.appendTo($(this.element));
	  SummaryContainer.appendTo($(this.element));
	  //WrapperDiv.appendTo($(this.element));
	  
	  // append button to element
	  $(this.element).append(ContentTemplate.clone().addClass("hide-on-print").css({"clear":"both", "width":"70%", "margin":"0 auto 0"})
	  .append('<input type="button" class="button print-cash-summary"  data-theme="b" data-mini="true" id="print"  value="Tagesabschluss Drucken" />'));

	  // enable button style
	  $(".button").button();
	},

	/*
	** @function _bindEvents
	*/
	_bindEvents: function() {	
	  this._on("input", {
		"keydown": function(event) {
		  switch(event.which) {
			  case 37: // left
			  $(event.currentTarget).parent().prev().prev().find("input").focus();
			  break;
	  
			  case 38: // up
			  break;
	  
			  case 39: // right
			  $(event.currentTarget).parent().next().next().find("input").focus();
			  break;
	  
			  case 40: // down
			  break;
	  
			  default: return; // exit this handler for other keys
		  }
		  event.preventDefault(); // prevent the default action (scroll / move caret)	
		}
	  });
	
	  this._on(".print-cash-summary", {
		"click": function(event) {
		 $(".hide-on-print").remove();
		 $(".main-option").parent().html("&nbsp;&nbsp;&nbsp;&nbsp;");
		 window.print();
		}
	  });
		
	  this._on(".cash-input", {
		 "click": function(event) {
		   $(event.currentTarget).select(); 
		 },
		 "change": function(event) {  
		    this._checkInput($(event.currentTarget),false);
			this._calculateRow($(event.currentTarget).parent("div").parent(".cash-container-column"));
			this._calculateSum(".summary",".moneysummary",true);
			this._calculateFinal();
		 },
		 "focusin": function(event) {
			$(event.currentTarget).parent("div").parent(".cash-container-column").addClass("hover"); 
		 },
		 "focusout": function(event) {
			if($(event.currentTarget).val() == "") {
			  $(event.currentTarget).val(0);
			}
			$(event.currentTarget).parent("div").parent(".cash-container-column").removeClass("hover"); 
		 }
	  });
	  
	  this._on(".tele-input", {
		 "click": function(event) {
		   $(event.currentTarget).select(); 
		 },
		 "change": function(event) {
		   this._checkInput($(event.currentTarget),true);
		   this._calculateSum(".tele-input",".telesummary",false); 
		   this._calculateFinal(); 
		 },
		 "focusin": function(event) {
			$(event.currentTarget).parent("div").parent(".cash-container-column").addClass("hover"); 
		 },
		 "focusout": function(event) {
			if($(event.currentTarget).val() == "") {
			  $(event.currentTarget).val(0);
			  this._checkInput($(event.currentTarget),true);
			}
			$(event.currentTarget).parent("div").parent(".cash-container-column").removeClass("hover"); 
		 }
	  });
	  
	  this._on(".credit-input", {
		 "click": function(event) {
		   $(event.currentTarget).select(); 
		 },
		 "change": function(event) {
		   this._checkInput($(event.currentTarget),true);
		   this._calculateSum(".credit-input",".creditsummary",false); 
		   this._calculateFinal(); 
		 },
		 "focusin": function(event) {
			$(event.currentTarget).parent("div").parent(".cash-container-column").addClass("hover"); 
		 },
		 "focusout": function(event) {
			if($(event.currentTarget).val() == "") {
			  $(event.currentTarget).val(0);
			  this._checkInput($(event.currentTarget),true);
			}
			$(event.currentTarget).parent("div").parent(".cash-container-column").removeClass("hover"); 
		 } 
	  });
	  
	  this._on(".cash-to-bank", {
		 "click": function(event) { $(event.currentTarget).select(); },
		 "change": function(event) { this._checkInput($(event.currentTarget)); this._calculateFinal(); },
		 "focusin": function(event) {
			$(event.currentTarget).parent("div").parent(".cash-container-column").addClass("hover"); 
		 },
		 "focusout": function(event) {
			if($(event.currentTarget).val() == "") {
			  $(event.currentTarget).val(0);
			  this._checkInput($(event.currentTarget),true);
			}
			$(event.currentTarget).parent("div").parent(".cash-container-column").removeClass("hover"); 
		 }
	  })
	  
	  this._on(".main-option", {
		 "change": function(event) {  
		    $(".cash-option").each(function(Index, Element) {
			  if($(Element).attr("terminal") == $(event.currentTarget).attr("terminal")) {
				$(Element).val($(event.currentTarget).val()); 
			  }
			});
			
			$(".cash-column").each($.proxy(function(Index, Element) {
			  this._calculateRow($(Element));
			},this));
			
			this._calculateSum(".summary",".moneysummary",true);
			this._calculateFinal();

		 }  
	  });
	},
	
	/*
	** @function _calculateRow
	*/
	_calculateRow: function(DomNode) {
	  var InputFields = DomNode.find(".cash-input"),
	  	  InputValue  = DomNode.attr("value"),
		  InputSum    = 0;
		  
	  InputFields.each($.proxy(function(index, input) {
		var CashInput = ($(input).val() !== "") ? $(input).val() : 0,
		    CashOption = (DomNode.attr("weight") != false) ? $(input).parent().next().find("select").val() : "count";
		
		$.ajax ({
		  async: false,
		  cache: true,
		  context: this,
		  type:  "POST",
		  url:   "calculate.php",
		  data:  {"value":InputValue,"input":CashInput,"type":CashOption},
		  success: function(responce) {	
			responce = $.parseJSON(responce);
			InputSum = this._convertToFloat(InputSum) + this._convertToFloat(responce.result);
		  }
		}); 
	  },this));
	  
	  DomNode.find(".summary").html( this._replace(this._checkFloat2Digits(InputSum),".",",") + " €");
	},
	
	/*
	** @function _calculateSum
	*/
	_calculateSum: function(SummaryClass, SummaryCountedClass, html) {
	  var SummaryFields = (html !== true) ? $(SummaryClass).find("input") : $(SummaryClass);
	  	  SummaryCounts = 0;

	  SummaryFields.each($.proxy(function(Index, Element) {			
		var CashValue = (html === true) ? $(Element).html() : $(Element).val(),
		    CashValue = (CashValue == "") ? 0 : CashValue;
		    CashValue = this._replace(CashValue, " €", ""),
			CashValue = this._convertToFloat(this._replace(CashValue, ",", "."));
		    SummaryCounts = this._convertToFloat(SummaryCounts),
			SummaryCounts = this._checkFloat2Digits(Math.round((SummaryCounts + CashValue) * 100) / 100);

	  },this));	 
	  
	  $(SummaryCountedClass).html(this._replace(SummaryCounts, ".", ",") + " €");	
	},
	
	/*
	** @function _calculateFinal
	*/
	_calculateFinal: function() {
	  var MoneyHtml = $(".moneysummary").html(),
	      MoneyVal  = this._replace(MoneyHtml, " €", ""),
		  MoneyVal  = this._convertToFloat(this._replace(MoneyVal, ",", ".")),
		  TeleHtml  = $(".telesummary").html(),
	      TeleVal   = this._replace(TeleHtml, " €", ""),
		  TeleVal   = this._convertToFloat(this._replace(TeleVal, ",", ".")),
		  CreditHtml = $(".creditsummary").html(),
	      CreditVal  = this._replace(CreditHtml, " €", ""),
		  CreditVal  = this._convertToFloat(this._replace(CreditVal, ",", ".")),
		  CashToBank = $(".cash-to-bank").val(),
		  CashTobank = this._convertToFloat((CashToBank == "") ? 0 : CashToBank),
		  MoneySummary = this._checkFloat2Digits(MoneyVal+CashTobank),
		  AllSummary = this._checkFloat2Digits(this._convertToFloat(MoneySummary)+TeleVal+CreditVal);
		
	  $(".moneysummaryall").html(this._replace(Math.round(MoneySummary*100)/100, ".", ",") + " €");
	  $(".telecashsummaryall").html(TeleHtml);
	  $(".creditsummaryall").html(CreditHtml);
	  $(".allsummary").html(this._replace(Math.round(AllSummary*100)/100, ".", ",") + " €")
	},
	
	_checkInput: function(Element, CheckDigits) {
	  var RegularExpr = /^\+?(\d+|\d*\.\d{1,2})$/,
	      StringValue = this._replace(Element.val(),",","."),
	 	  StringValue = (StringValue == "") ? 0 : parseFloat(StringValue);
		  
	  (CheckDigits) ?	  
	    Element.val(this._replace(this._checkFloat2Digits(StringValue),".",",")):
	    Element.val(this._replace(StringValue,".",","));
	},
	
	/*
	** @function _checkFloat2Digits
	*/
	_checkFloat2Digits: function(float) {
	  var decimalCheck = this._convertToString(float).indexOf(".");
		
	  if(decimalCheck == "-1") {
		float = float + ".00";	
	  } else {
		if(this._convertToString(float).substr(decimalCheck + 1).length == 1) {
		  float = float + "0";		  
		}
	  }
	  return float;
	},
	
	/*
	** @function _convertFloatToString
	*/
	_convertToString: function(float) {
	  return float.toString();
	},
	
	/*
	** @function _convertStringToFloat
	*/
	_convertToFloat: function(string) {
	  if(this._convertToString(string).indexOf(",") != -1) {
		string = this._replace(string, ",", ".")  
	  }
	  return parseFloat(string);
	},	
	
	/*
	** @function _replaceChars
	*/
	_replace: function(string, _find, _replace) {
	  if(this._convertToString(string).indexOf(_find) == -1) {
		return this._convertToString(string);
	  }	
		
	  return this._convertToString(string).replace(_find, _replace);
	},
	
	/*
	** @function _getCashData
	*/
	_getCashData: function() {
	  $.ajax ({
		async: false,
		cache: true,
		context: this,
		type:  "POST",
		url:   "cashdata.php",
		data:  {"jQueryAjax": true},
		success: function(responce) {	
		  this.cashdata = $.parseJSON(responce);
		}
	  }); 	
	}
  });
})(jQuery);	