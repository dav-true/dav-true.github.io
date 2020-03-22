

$('document').ready(function () {

  
    async function vue () {
        const dt = await loadData();
        let cities = dt.cities;
        let cinemas = dt.cinemas;
        

        Vue.component ("city-option", {
            // data : {cities : cities},
            props:{city: Object},
            template: `<div>{{city.name}}</div>`
        })
        
        
        new Vue({
            el: "#city-choose-div",
            data : {cities : cities}
        })    

        Vue.component ("cinema", {
            // data : {cities : cities},
            props:{cinema: Object},
            template: ` <div class='cinema-block'>
                            <div class='cinema-photo-div' v-bind:style="{ backgroundImage: 'url(' + cinema.photo + ')' }"></div>
                            <div class='cinema-info-div'>
                                <div>
                                    <p class="cinema-name">{{cinema.name}}   <sup style="margin-left:20px;"><span style="
                                                                                padding: 0px 7px 0px 7px; border-radius: 5px;
                                                                                color: black; background-color: #fbcfa8; ">{{cinema.city}}</span></sup></p>
                                    <p class="cinema-address">{{cinema.address}}</p>
                                    <p class="cinema-num">{{cinema.phone_num}}</p>
                                    <p style="padding: 5px; background-color: yellowgreen; width: 100px; text-align: center; border-radius: 5px;">Schedule</p>
                                </div>
                            </div>
                            <div class='cinema-tags-div'>
                                <div >
                                    <h6 class="tags" v-for="tags in cinema.tags" :tags="tags"> {{tags}}</h6>
                                </div>
                            </div>
                        </div>`
        })
        new Vue({
            el: "#cinema-list",
            data: {cinemas : cinemas} 
            
        })

        // var n = $('.tags').eq(0).attr('tags')
        // console.log(n)
        
        var temp = [];
        
        $('.cinema-class-tag').click(function() {
            var clicked = $(this).text();
            
            if(temp.length == 0) {
                temp.push(clicked);
                console.log(temp);
            } else {
                var temp_counter = 0;
                for(n = 0; n < temp.length; n++) {
                    if(temp[n] == clicked) {
                        temp_counter++;
                    }
                } 

                if (temp_counter == 0) {
                    temp.push(clicked);
                    console.log(temp)
                } else {
                    const index = temp.indexOf(clicked)
                    if(index > -1) {
                        temp.splice(index, 1)
                    }

                    console.log(temp)
                }
            }

           


            for(i = 0; i < $('.cinema').length; i++ ) {
                var c = $('.cinema').eq(i).contents().find('.tags');
                var counter = 0;
                for(k = 0; k < c.length; k++ ){
                    var tag = c.eq(k).text()
                    
                    if (tag == ' ' + clicked) {
                        counter++;
                    }
                } 
                
                if (counter == 0) {
                    $('.cinema').eq(i).css('display', 'none')
                } else {
                    $('.cinema').eq(i).css('display', 'flex')
                }
                
            }
        })

    }


    vue()

    
    
    var ln = $('.poster').length;
    var groups = ln / 3;
    var modal = $('.modal-div')[0];
    var options_div = $("#cities-options-div");

    async function loadData() {  /////////////////// Load json file
        const url = "https://my-json-server.typicode.com/dav-true/dbjson/db";
        const res = await fetch(url);

        if (res.ok) {
            console.log("ok");
        } else {
            console.log ("ga");
        }
        return res.json();
    }


    function slideToElement(i) {
        var i = i;
        var target;
        var time;


        if(i == 0) {
            target = "#movies";
            time = 400;
        } else if (i == 1) {
            target = "#cinemas"
            time = 800;
        } else if (i == 2) {
            target = "#about-us"
        } else if (i == 3) {
            target = "#contacts"
        }

        console.log(target)
        $('html, body').stop().animate({
            scrollTop : $(target).offset().top
        }, time)
    }
    
    
    $('.nav-butt').click(function (){         ////////////////////// Animation of moving to dif pages blocks
        slideToElement($(".nav-butt").index(this));
    })
    $('.nav-butt-drop').click(function (){         ////////////////////// Animation of moving to dif pages blocks
        slideToElement($(".nav-butt-drop").index(this));
    })



    for (i = 0; i < groups; i++ ) {           ///////////////////////// Different margin-top when different amount of posters in a row
        if(i % 2 == 0) {
            for(k = i * 3 ; k < i * 3 + 3; k++ ) {
                if(k % 2 == 0) {
                    $('.poster').eq(k).css('margin-top', '120px');
                    
                } else {
                    $('.poster').eq(k).css('margin-top', '60px');
                    
                }
            }

        } else if (i % 2 == 1) {
            for(k = i * 3 ; k < i * 3 + 3; k++ ) {
                if(k % 2 == 0) {
                    $('.poster').eq(k).css('margin-top', '60px');
                
                } else {
                    $('.poster').eq(k).css('margin-top', '120px');
                    
                }
            }
        } 
    }
    
    $(".poster-div").mouseenter(function () {       /////////////////////// Poster blur
        var i = $(this).index();
        $(".centered").eq(i).fadeTo(300, 1)
    })
    $(".poster-div").mouseleave(function () {
        var i = $(this).index();
        $(".centered").eq(i).fadeTo(1, 0)
    })

    $(".mark").mouseenter(function () {            ///////////////////////  Marks sliding up and sliding down on hover
        var i = $(this).index();
        $('.mark').eq(i).css('animation', 'slideUp .4s forwards')
        $('.mark::after').eq(i).fadeTo(300,1)
    })
   
    $(".mark").mouseleave(function () {
        var i = $(this).index();
        $('.mark').eq(i).css('animation', 'slideDown .4s forwards')
        $('.mark::after').eq(i).fadeTo(300,0)
    })
   
  

    window.onclick = function(event) {  ///////////////////////////// Modal div closing by clicking ourside the block
        if (event.target == modal) {
            modal.style.opacity = "0";
            modal.style.display = "none";

            let target = $('#trailer-iframe');
        
            target.attr('src', '');
          
        } 
      }
    
    $(document).click (function(event) {
        if(!$(event.target).hasClass('targeter')) {
            $('#cities-options-div').css('animation', 'dropDownOut 0.4s forwards');
            $('#cities').attr('data-check', "false");
            $("#cities-arrow").css('animation', 'downUpRotate 0.4s forwards')
        }
        if(!$(event.target).hasClass('targeter_2')) {
            $('.dropped-menu').css('animation', 'fadeOutRight 0.4s forwards');
           
        }
    })
    
    function screenWidth () {          ////////////////////////////  Resize Poster-div by changing screen width
        if ($(window).width() >= 1283) {
            $('.dropped-menu').css('display', 'none')
            for (i = 0; i < ln; i++ ) {
                if(i % 3 == 0 ) {
                   $('.poster-div').eq(i).css("margin-left", '0')
                } else {
                    $('.poster-div').eq(i).css("margin-left", '150px')
                }
            } 
        } else if($(window).width() <= 1282 && $(window).width() >= 1093 ) {
            $('.dropped-menu').css('display', 'none')
            for (i = 0; i < ln; i++ ) {
                if(i % 2 == 0 ) {
                   $('.poster-div').eq(i).css("margin-left", '0')
                } else {
                    $('.poster-div').eq(i).css("margin-left", '250px')
                }
            } 
         
        } else if($(window).width() <= 1094 && $(window).width() >= 893){
            $('.dropped-menu').css('display', 'none')
            for (i = 0; i < ln; i++ ) {
                if(i % 2 == 0 ) {
                   $('.poster-div').eq(i).css("margin-left", '0')
                } else {
                    $('.poster-div').eq(i).css("margin-left", '100px')
                }
            } 
        } else if ($(window).width() <= 892) {
            $('.poster-div').css("margin-left", '20%')
        }
    }


    $(window).resize(function() {   
        console.log($(window).width())
       screenWidth();
    })

    screenWidth();

    $('.centered').click (async function () {             //////////////////////// Poster name clicking function
        var id = $(this).attr('data-jsonid');
        console.log(id);  
      
        var data = await loadData();
        let target = $('#trailer-iframe');
        
        target.attr('src', data.movies[id].url);
        $('#modal-movie-title').text(data.movies[id].title)
        $('#movie-year').text(data.movies[id].year);
        $('#movie-country').text(data.movies[id].country);
        $('#movie-director').text(data.movies[id].director);
        $('#movie-genre').text(data.movies[id].genre);
        $('#movie-age').text(data.movies[id].age);
        $('#movie-time').text(data.movies[id].time);
        $('#movie-actors').text(data.movies[id].actors);
        $('#description').text(data.movies[id].description);

        $('.modal-div').css('display', 'block');
        $('.modal-div').fadeTo(400,1)
       
    })


    $("#cities").click(() => {                  ///////////////////////////// Cities drop down list animationW
        if($('#cities').attr('data-check') == "false") {
            $('#cities').attr('data-check', "true");
            $('#cities-options-div').css('animation', 'dropDown 0.4s forwards');
            $("#cities-arrow").css('animation', 'upDownRotate 0.4s forwards')
        } else if ($('#cities').attr('data-check') == 'true') {
            $('#cities-options-div').css('animation', 'dropDownOut 0.4s forwards');
            $('#cities').attr('data-check', "false");
            $("#cities-arrow").css('animation', 'downUpRotate 0.4s forwards')
        }

    })


    $('.close-butt').click (function () {
        
        $('.dropped-menu').css('animation', 'fadeOutRight 0.4s forwards');
    })

    $('.menu-butt').click (function () {
        $('.dropped-menu').css('display', 'block');
        $('.dropped-menu').css('animation', 'fadeInRight 0.4s forwards')
    })

})






    // Vue.component ("city-option", {
    //     template: `<p>{{city.name}}</p>`
    // })
    // const cities = [
    //     {id:0, name:"kyiv"},
    //     {id:0, name:"kyiv"},
    //     {id:0, name:"kyiv"}
    // ];

    
    // new Vue({
    //     el: "#app",
    //     data: {cities : cities}
    // })  