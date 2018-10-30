// Initialize your app
var mixes = [];
var productdetails = [];
var custvar = [];
var proditm = [];
var quantity;
var prdprice;
var category_id;
var category_name;
var product_code;
var prod_quant;
var totalprdprice;
var prod_signature;
var max_quant;
var img_url;
var branch_id;
var branch_name;
var delivery_type;
var state_id;
var product_name;
var city_id;
var delivery_price = 0;
var tprice;
var totalshipping;
var token = '1000';
var hasvariant;
var member_no =2111;
var voucher_code;
var order_no;
var mdt;

var myApp = new Framework7();

function totalprice(){
	 tprice = parseFloat(prdprice) * parseFloat(prod_quant);
	$('#col-tot-price').html(tprice);
	$('#cost-price').html(tprice);
}


function totalshipitm(){
	 totalshipping = parseFloat(tprice) + parseFloat(delivery_price);
	$('#grand-total').html(totalshipping);
}

function calccombo(){
        let self = this;
        $.each(productdetails[0].data.combinations, function (index, value) {

            let comboi = custvar.length;
            let trackmain = 0;

            $.each(custvar, function (i, val) {
                let track;
                let tracki = 0;

                track = (value.comb[i].includes(val));

                if(track){

                    trackmain += 1;

                }
                else
                {

                }

            })
            if (trackmain == comboi){
              //  console.log(value.price)
				$('.product-price').html(value.price);
				prdprice = value.price;
                // self.editproductdetailsprice(value.price)

                trackmain = 0;
                return false;
            }

        })
}


// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

 var mySwiper = myApp.swiper('.swiper-container', {
    pagination:'.swiper-pagination',
    paginationClickable: true,
    autoplay: 2500,
    autoplayDisableOnInteraction: false
  });

 var mySwiper = myApp.swiper('.swiper-container2', {

  });
 var mySwiper = myApp.swiper('.swiper-container3', {

  });

// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('about', function (page) {
    // run createContentPage func after link was clicked
    $$('.create-page').on('click', function () {
        createContentPage();
    });
});

(function ($) {
 "use strict";
    
$(document).ready(function(){
    /*------------------------
    menu toggle
    --------------------------*/

    $(".js-toggle-menu").on('click', function(){
        $(".show-menu").slideToggle();
    });
    
    $(".js-toggle-menu2").on('click', function(){
        $(".show-menu2").slideToggle();
    });
    
    $( '.swipebox' ).swipebox();

  $(".clickopen").on('click', function(){
        $(".popover-links").slideToggle();
    });
     
    
});
    
    
    
})(jQuery); 


$(document).on('click','#btn-login', function(){
		var username = $('#txtUsername').val();
var password = $('#pwdPass').val();
//	myApp.alert(username +" "+ password);
	if(username == "olayinka"){
		if(password =="password"){
			window.location.replace('inner.html');
		}else{
		myApp.alert("Invalid Credentials");
	}
		
	}else{
		myApp.alert("Invalid Credentials");
	}
			   
});

$(document).on('click','#logout', function(){
		window.location.replace('index.html');

			   
});


$(document).on('pageinit', '.page[data-page="catalogue"]', function (e) {
	
$.ajax({
    type:"GET",
    url:"https://rewardsboxnigeria.com/rewardsbox/api/v1/?api=get_category&flag=catalogue",
    headers:{"token":token},
    dataType:"json",
    success: function(msg){

        if (msg.status ==1){
            $.each(msg.data, function(key,value)
            {
                $('.list-categories').append("<p><a class='cat-link' href='catalogue.html' data-catid='"+value.category_id+"' data-catname='"+value.category+"'>"+value.category+"</a></p>");
            })
        }
        else{
            alert(msg);
        }
    }
});
	
});



$(document).on('click', 'a.cat-link', function(){
	category_name = $(this).attr('data-catname');
	category_id = $(this).attr('data-catid');
	mainView.router.loadPage('shop-list.html');
});


$(document).on('pageinit', '.page[data-page="shop-list"]', function (e) {
	
	product_code = "";
	$('#category-name').html(category_name);
	
	var prd_itm ="";
	
	$.ajax({
    			type:"POST",
			url:"https://rewardsboxnigeria.com/rewardsbox/api/v1/?api=get_products",
        headers:{"token":token},
			data:{category_id: category_id},
    			dataType:"json",
    			success: function(msg){

					if (msg.status ==1){
						 $.each(msg.data, function(key,value)
                            {
		 prd_itm += '<div class="single-shop-list">';
		 prd_itm += '<div class="shop-inner">';
		 prd_itm += '<div class="shop-img">';
		 prd_itm += '<a href="single-product.html" class="product-link" data-product_code="'+value.product_code+'"><img src="'+value.image+'" alt=""/></a>';
		 prd_itm += '</div>';
		 prd_itm += '<div class="shop-content">';
		 prd_itm += '<h3><a href="single-product.html" class="product-link" data-product_code="'+value.product_code+'">'+value.product+'</a></h3>';
		 prd_itm += '<div class="pro-rating-s">';
		 prd_itm += '<a href="#"><i class="fa fa-star"></i></a>';
		 prd_itm += '<a href="#"><i class="fa fa-star"></i></a>';
		 prd_itm += '<a href="#"><i class="fa fa-star"></i></a>';
		 prd_itm += '<a href="#"><i class="fa fa-star"></i></a>';
		 prd_itm += '<a href="#"><i class="fa fa-star"></i></a>';
		 prd_itm += '</div>';							
		 prd_itm += '<div class="price-box">';
		 prd_itm += '<span class="new-price">'+value.price+'</span>';
		 prd_itm += '</div>';	
		 prd_itm += '</div>';					
		 prd_itm += '</div>';
		 prd_itm += '</div>';
					})
						$('.shop-area').html(prd_itm);
								}
					else if(msg.status ==0){
						$('.shop-area').append('<h3>There is no item in this category');
					}
					else{
						alert("Status Code: "+msg.status+"\n"+msg.message);
					}

				}
		});
	
});

$(document).on('click', 'a.product-link', function(){
	
	product_code = "";
	product_code = $(this).attr('data-product_code');
	mainView.router.loadPage('single-product.html');
	
});

$(document).on('pageinit', '.page[data-page="single-product"]', function (e) {
	//alert(product_code);
	//alert(category_id);

	$.ajax({
    			type:"POST",
			url:"https://rewardsboxnigeria.com/rewardsbox/api/v1/?api=product_details&product_code="+product_code,
  headers:{"token":token},
      data:{category_id: category_id},
    			dataType:"json",
    			success: function(msg){

    			//	console.log(msg);

                    productdetails.push(msg);

					if (msg.status ==1 ){

						prdprice = msg.data.price;
						max_quant = msg.data.max_quantity;
						img_url = msg.data.image[0].image_url;
						product_name = msg.data.product_name;
                        hasvariant = msg.data.is_variant;
						//delivery_type = msg.data.delivery_type;


						let result = "";
						
						result += '<div class="single-product">';
						result += '<div class="single-product-img">';
						result += '<a href="#"><img src="'+msg.data.image[0].image_url+'" alt="" /></a>';
						result += '</div>';
						result += '<div class="single-product-content">';
						result += '<h1 class="product_title">'+msg.data.product_name+'</h1>';	
						result += '<div class="price-box">';
						result += '<span class="new-price product-price">'+msg.data.price+'</span>';
						result += '</div>';
						result += '<div class="pro-rating">';
						result += '<a href="#"><i class="fa fa-star"></i></a>';
						result += '<a href="#"><i class="fa fa-star"></i></a>';
						result += '<a href="#"><i class="fa fa-star"></i></a>';
						result += '<a href="#"><i class="fa fa-star"></i></a>';
						result += '<a href="#"><i class="fa fa-star"></i></a>';
						result += '</div>';	
						result += '<div class="short-description">';
						result += '<p>'+msg.data.description+'</p>';						
						result += '</div>';
						result += '<form action="#">';
						
						let result2 = "";
						if (msg.data.delivery_type == 1){
               delivery_type = 1;
							result2+='<p class=""><input type="radio" class="rad-delmet" value="1" checked="checked"/>';
							result2+='Pickup';
							result2 +='</p><p><select class="constant-pickup drppickup" required>';
							result2 +='<option>Pickup Location</option>';

                            $.each(msg.data.branch_details, function(key,value)
                            {
                                result2 +=('<option value="'+value.branch_id+'">'+value.branch_name+'</option>');
                            });
                            result2 +='</select></p>';
                           // $('.div-cat-itm-info').html(result2);
                           	 delivery_type = 1;
                        }



							else if (msg.data.delivery_type == 2){
                 delivery_type = 2;

								result2 +='<div><input type="radio" class="rad-delmet" value="2" checked="checked"/> Delivery</div>';

							}
						else if(msg.data.delivery_type == 3){
              mdt = 3;
								result2 +='<p><input type="radio" class="rad-delmet" value="2" name="rad-delmet" id="rad-del" /> Delivery <input type="radio" class="rad-delmet" value="1" name="rad-delmet" id="rad-pickup" /> Pickup</p><p class="div-sel-pickup" style="display:none;"><select class="constant-pickup drppickup"><option value="">Pickup Location</option>';
							 $.each(msg.data.branch_details, function(key,value1)
                            {
								 result2+='<option value="'+value1.branch_id+'"  data-branchname="'+value1.branch_name+'">'+value1.branch_name+'</option>';
							 });
							result2+='</select></p>';
              	 delivery_type = 2;
								}
						
							if (msg.data.is_variant == 1){//It is a boolean to show product has some attributes 1 is true and 0 is false

                            result2+='<div class="varient-div">';

							$.each(msg.data.attributes, function(key2,attributes)
                            {
									result2+='<p><select data-name ="'+attributes.name+'" class="sel-varient constant-pickup" id="'+attributes.id+'" required><option value="">Select '+attributes.name+'</option>';
								$.each(attributes.details, function(key3,details)
                            	{
									result2+='<option value="'+details.variant_id+'">'+details.variant_name+'</option>';
								});
								result2 +='</select></p>';
							});

                            result2 +='</div>';

                            $.each(msg.data.combinations, function(key,comb)
                                            {
                              mixes.push([comb]);
                            });

						}
						
						result += result2;
						
						result += '<div class="quantity">';
						result += '<input type="number" id="itm-quant" value="" min="1" max="'+msg.data.max_quantity+'">';
						result += '<a href="#" id="btn-buy">Buy Now</a>';
						result += '</div>';
						result += '</form>';						
						result += '</div>';
						result += '</div>';

						
						
					
					 prod_signature = msg.data.signature;
					 
                        $('.single-product-area').html(result)
								}
					else{
						 $('.single-product-area').html("Status Code: "+msg.status+"\n"+msg.message);
					}

				}
		});
});


$(document).on('change', '.sel-varient', function(){

custvar=[];
//	//myApp.alert(mixes);
	let self = this;
	$.each($('.varient-div select'),function(index, value){
		             // console.log($(value).find('option:selected').val())
                    // return false
		//console.log($(value));
                    if($(value).find('option:selected').val() == '') {
                        //myApp.alert('Please complete the form');
                        return false;
                    }else{
					//console.log('Else area')
                        custvar.push($(value).find('option:selected').val());

						//console.log("the array has ",custvar);

                        //self.canaddtocart = true;
                        // console.log(self.$store.state.combo)
                       calccombo();





	}

});



});

$(document).on('change', '.rad-delmet', function(){
	 if ($("#rad-pickup").is(":checked")) {
            $('.div-sel-pickup').show();
		 delivery_type = 1;
        }
        else if ($("#rad-del").is(":checked")) {
            $('.div-sel-pickup').hide();
         delivery_type = 2;
        }
        else {
            $('.div-sel-pickup').hide();
}
    });

$(document).on('click', '#btn-buy', function(){
		//myApp.alert(delivery_type);
		let check_variant = 0;
		let check_name ="";
		if(hasvariant == 1){
             $('.sel-varient').each(function() {
                 if ($(this).val()=="") {
                 	check_variant = 1;
                 	check_name = $(this).attr('data-name');
                 	//alert(check_name);
                 }
             });
         }


         if(check_variant == 0) {
             if ($('#itm-quant').val() == "") {
                 myApp.alert('Enter Quantity');
             } else if ($('#itm-quant').val() == 0) {
                 myApp.alert('Enter Quantity minimum of 1');
              }
               else if(mdt == 3){
                if (delivery_type == "") {
                  myApp.alert('Select a Delivery Method');
              }
            }else if ($("input[name='rad-delmet']").val == 1) {
                  if ($('.drppickup').val() == "") {
                      myApp.alert('Select a pickup location');

                  }
              }
             else {
                 branch_name = $('.drppickup option:selected').attr('data-branchname');
                 branch_id = $('.drppickup option:selected').val();

                 //myApp.alert(branch_name);


                 prod_quant = $('#itm-quant').val();
                 //myApp.alert(delivery_type);
                 //alert('reached here');
                 mainView.router.loadPage('shopping-cart.html');
                 //myApp.router.loadPage('shopping-cart.html');
                 //	mainView.router.navigate('shopping-cart.html');
                 //myApp.router.navigate('shopping-cart.html');
             }
         } else {

             myApp.alert('Select Product '+check_name);
             return false;
		 }
});

$$(document).on('pageInit', '.page[data-page="shopping-cart"]', function (e) {
  // Following code will be executed for page with data-page attribute equal to "about"
 // myApp.alert('This is the auction description page');

	//var delivery_name;
	//alert(delivery_name);

    let result;
    let result2;

				if(delivery_type == 1){
				delivery_name = "Pick Up:";
					$('.table-cart-address').hide();
					$('.p-delivery').hide();




				}else if (delivery_type == 2){
					delivery_name = "Delivery";
					$('.table-cart-address').show();
					$('.p-delivery').show();
		
					$.ajax({
    			type:"GET",
			url:"https://rewardsboxnigeria.com/rewardsbox/api/v1/?api=get_state",
        headers:{token:token},
    			dataType:"json",
    			success: function(msg){
					//alert("na we dey here");
					if (msg.status ==1 ){

						$.each(msg.data, function(key,value)
                            {
							   $('#delivery-state').append('<option value="'+value.State_id+'">'+value.State_name+'</option>');
							   });

					}
				}
	});
				}
						
	
							result = '<tr class="carttr_1">';
							result += '<td>';
							result += '<div class="cartpage-image">';
							result += '<a href="#"><img alt="" src="'+img_url+'"></a>';
							result += '</div>';
							result += '</td>';
							result += '<td>';
							result += '<div class="cartpage-pro-dec">';
							result += '<p><a href="#">'+product_name+'</a></p>';
							result += '<span>'+delivery_name+'</span>'
	 							if(delivery_type==1){
									result2 = '<span>'+branch_name+'</span>';
									result += result2;
									}
							result += '</div>';
							result += '</td>';
							result += '<td>';
							result += '<div class="unite-price">';
							result += '<p>'+prdprice+'</p>';
							result += '</div>';
							result += '</td>';
							result += '<td>';
							result += '<div class="cart-quty">';
							result += '<input type="number" min="1" value="'+prod_quant+'" max="'+max_quant+'">';
							result += '</div>';
							result += '</td>';
							result += '<td>';
							result += '<div class="subtotal">';
							result += '<p id="col-tot-price">'+prdprice+'</p>';
							result += '</div>';
							result += '</td>';
							result += '<td>';
							result += '<div class="cartpage-delete-item">';
							result += '<a title="Remove item" href="#"><i class="fa fa-trash-o"></i></a>';
							result += '</div>';
							result += '</td>';
							result += '</tr>';
						
                        $('.table-prd-item').html(result);
						totalprice();
                        totalshipitm();
						

});


$(document).on('change', '#delivery-state', function(){
	state_id = $('#delivery-state').val();
	$.ajax({
    			type:"GET",
			url:"https://rewardsboxnigeria.com/rewardsbox/api/v1/?api=get_city&state_id="+state_id,
        headers:{token:token},
			data:{state_id:state_id},
    			dataType:"json",
    			success: function(msg){
					if (msg.status ==1 ){

						 $('#delivery-city').html(' <option value="">Select Delivery City..</option>');

						$.each(msg.data, function(key,value)
                            {
							   $('#delivery-city').append('<option value="'+value.City_id+'">'+value.City_name+'</option>');
							   })

					}
				}
	});

});

$(document).on('change', '#delivery-city', function(){

	city_id = $('#delivery-city').val();

	//Using the single delivery item api
	$.ajax({
    			type:"POST",
			url:"http://rewardsboxnigeria.com/rewardsbox/api/v1/?api=item_delivery_price",
      headers:{token:token},
      data:{city_id:city_id, state_id:state_id,signature:prod_signature,quantity:prod_quant},
    			dataType:"json",
    			success: function(msg){
					if (msg.status ==1 ){
						delivery_price = msg.data.price;
						$('#delivery-text').html(delivery_price);
						totalshipitm();

					}else{
						myApp.alert("Problem with retrieving delivery price \n"+msg);
					}
				}
	});


});


$(document).on('click', '#btn-checkout', function(){
	//myApp.alert("This button works");
	var first_name = $('#txtfname').val();
	var last_name = $('#txtlname').val();
	var email = $('#txtemail').val();
	var phone = $('#txtphone').val();
	var ref_no = Math.floor(Math.random() * 10);
	var address = $('#txtaddress').val();
  city_id = $('#delivery-city').val();
  state_id = $('#delivery-state').val();

  var cust_det = [];
  var cust_payload = {state_id: state_id, city_id: city_id, first_name: first_name, last_name: last_name, email: email, phone_no: phone, shipping_cost: totalshipping, address: address};
  cust_det.push(cust_payload);
  	contact = JSON.stringify(cust_payload);


	if (first_name == ""){
		myApp.alert("Enter First Name");
	} else if (last_name == ""){
		myApp.alert("Enter Last Name");
	} else if (email == ""){
		myApp.alert("Enter Email Address");
	} else if (phone == ""){
		myApp.alert("Enter Phone Number");
	} else{
		let payload = {branch_id: branch_id, ref_no:ref_no, quantity:prod_quant, price:tprice, delivery_type:delivery_type, varients:custvar, shipping_cost:totalshipping, member_no:member_no, signature:prod_signature, branch_id:branch_id, delivery_details:JSON.stringify(cust_payload)}


			$.ajax({

    		type:"POST",
			url:"http://rewardsboxnigeria.com/rewardsbox/api/v1/?api=item_purchase",
        headers:{token:token},
      data:payload,
    			dataType:"json",
    			success: function(msg){
					if (msg.status == 1){

	voucher_code = msg.voucher_code;
                        order_no = msg.order_no;
                        mainView.router.loadPage('success.html');
                        delivery_type = "";
					}else{
						myApp.alert(msg.message);
					}
				}
	});

	}

});

