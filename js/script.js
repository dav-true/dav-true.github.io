

$('document').ready(function () {


    async function vue() {
        let dt = await loadData('https://my-json-server.typicode.com/dav-true/dbjson/db');
        let cities = dt.cities;
        let cinemas = dt.cinemas;



        Vue.component("city-option", {
            props: { city: Object },
            template: `<div class="city">{{city.name}}</div>`
        })

        new Vue({
            el: "#city-choose-div",
            data: { cities: cities }
        })

        Vue.component("cinema", {
            props: { cinema: Object },
            template: ` <div class='cinema-block' :class="cinema.city">
                            <div class='cinema-photo-div' v-bind:style="{ backgroundImage: 'url(' + cinema.photo + ')' }"></div>
                            <div class='cinema-info-div'>
                                <div>
                                    <p class="cinema-name">{{cinema.name}}   <sup style="margin-left:20px;"><span style="
                                                                                padding: 0px 7px 0px 7px; border-radius: 5px;
                                                                                color: black; background-color: #fbcfa8; ">{{cinema.city}}</span></sup></p>
                                    <p class="cinema-address">{{cinema.address}}</p>
                                    <p class="cinema-num">{{cinema.phone_num}}</p>
                                    <p class="schedule-button" style="padding: 5px; background-color: yellowgreen; width: 100px; text-align: center; border-radius: 5px;">Schedule</p>
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
            data: { cinemas: cinemas }

        })


        function fadeInLeft() {
            var el = $('#cinema-list'),
                newone = el.clone(true);

            el.before(newone);

            $("." + el.attr("class") + ":last").remove();

        }

        var temp = [];


        $('.mark').click(function () {
            fadeInLeft();
            temp = [];
            $('.cinema-class-tag').attr('data-checked', 'false').css({ 'background-color': "#dedede", 'color': "black", "border-color": "black" });
            $('#no-cinema-label').css('display', 'none');
            var city = $(this).attr('data-city');
            $('#city-lable').text(city);

            for (i = 0; i < $('.cinema').length; i++) {
                var c = $('.cinema').eq(i).contents().find('span').text();
                if (c == city) {
                    $('.cinema').eq(i).addClass('checked');
                    $('.cinema').eq(i).removeClass('unchecked')
                    $('.cinema').eq(i).addClass('show');
                    $('.cinema').eq(i).removeClass('unshow')

                } else {
                    $('.cinema').eq(i).removeClass('checked')
                    $('.cinema').eq(i).addClass('unchecked');
                    $('.cinema').eq(i).removeClass('show')
                    $('.cinema').eq(i).addClass('unshow');
                }
            }
            $('html, body').stop().animate({
                scrollTop: $('.cinemas-wrap').eq(0).offset().top
            }, 400)

        })


        $('.city').click(function () {
            fadeInLeft();
            temp = [];
            $('.cinema-class-tag').attr('data-checked', 'false').css({ 'background-color': "#dedede", 'color': "black", "border-color": "black" });
            $('#no-cinema-label').css('display', 'none');
            var city = $(this).text();
            $('#city-lable').text(city);
            if (city == "All cities") {
                $('.cinema').addClass('checked');
                $('.cinema').removeClass('unchecked');
                $('.cinema').addClass('show');
                $('.cinema').removeClass('unshow');

            }
            else {

                for (i = 0; i < $('.cinema').length; i++) {
                    var c = $('.cinema').eq(i).contents().find('span').text();
                    if (c == city) {
                        $('.cinema').eq(i).addClass('checked');
                        $('.cinema').eq(i).removeClass('unchecked')
                        $('.cinema').eq(i).addClass('show');
                        $('.cinema').eq(i).removeClass('unshow')

                    } else {
                        $('.cinema').eq(i).removeClass('checked')
                        $('.cinema').eq(i).addClass('unchecked');
                        $('.cinema').eq(i).removeClass('show')
                        $('.cinema').eq(i).addClass('unshow');


                    }
                }
            }

        })



        $('.cinema-class-tag').click(function () {

            fadeInLeft();

            if ($(this).attr('data-checked') == 'false') {
                $(this).css('background-color', "yellowgreen");
                $(this).css('color', "white");
                $(this).attr('data-checked', 'true')
                $(this).css("border-color", "white");
            } else {
                $(this).css('background-color', "#dedede");
                $(this).attr('data-checked', 'false')
                $(this).css('color', "black");
                $(this).css("border-color", "black");
            }

            var clicked = $(this).text();

            if (temp.length == 0) {
                temp.push(clicked);

            } else {
                var temp_counter = 0;
                for (n = 0; n < temp.length; n++) {
                    if (temp[n] == clicked) {
                        temp_counter++;
                    }
                }

                if (temp_counter == 0) {
                    temp.push(clicked);

                } else {
                    const index = temp.indexOf(clicked)
                    if (index > -1) {
                        temp.splice(index, 1)
                    }


                }
            }



            var cinema_counter = 0;
            for (i = 0; i < $('.checked').length; i++) {
                if (temp.length > 0) {
                    var c = $('.checked').eq(i).contents().find('.tags');  /////////All tags in line
                    var counter = 0;
                    for (k = 0; k < c.length; k++) {
                        for (l = 0; l < temp.length; l++) {
                            var tag = c.eq(k).text()
                            if (tag == ' ' + temp[l]) {
                                counter++;
                            }
                        }
                    }

                    if (counter < temp.length) {
                        cinema_counter++;
                        $('.checked').eq(i).addClass('unshow')
                        $('.checked').eq(i).removeClass('show')
                    } else if (counter >= temp.length) {
                        $('.checked').eq(i).addClass('show')
                        $('.checked').eq(i).removeClass('unshow')


                    }

                } else if (temp.length == 0) {
                    for (i = 0; i < $('.cinema').length; i++) {
                        $('.checked').eq(i).addClass('show')
                        $('.checked').eq(i).removeClass('unshow')


                    }
                }
            }

            if (cinema_counter == $(".checked").length) {
                $('#no-cinema-label').css("display", "block")
            } else {
                $('#no-cinema-label').css("display", "none")
            }
        })

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        var monthNames = [
            "January", "February", "March",
            "April", "May", "June",
            "July", "August", "September",
            "October", "November", "December"
        ]
        var schedt;
        var cinemaID;

        // async function schedtLoad() {
        //     schedt = await loadData('https://my-json-server.typicode.com/dav-true/schedb/db');
        // }
        function schedtLoad() {
            var request = new XMLHttpRequest();
            request.open("GET", "js/db.json", false);
            request.send(null)
            schedt = JSON.parse(request.responseText);
        }


        schedtLoad();
        var c_date = new Date();
        var c_year = c_date.getFullYear()
        var c_month = c_date.getMonth();
        var c_day = c_date.getDate();


        function currentMonthDisplay() {
            $('#month-label').text(monthNames[c_month]);
            var month_length = new Date(c_year, c_month + 1, 0).getDate();
            var day_of_week = new Date(c_year, c_month + 1, 1).getDay()
            var temp_day = 1;
            var test = day_of_week;

            while (test < day_of_week + month_length) {
                $('.day-of-week-num').eq(test).text(temp_day);
                temp_day++;
                test++;
            }
            for (j = 0; j < $('.day-of-week-num').length; j++) {
                if ($('.day-of-week-num').eq(j).text() != '') {
                    $('.day-of-week-num').eq(j).css('border', '2px solid rgb(253, 241, 227)')
                } else {
                    $('.day-of-week-num').eq(j).css('border', 'none')

                }
            }

        }
        

        $('#cal-left-switcher').click(function () {
            if (c_month > 0) {
                for (i = 0; i < $('.day-of-week-num').length; i++) {
                    $('.day-of-week-num').eq(i).text('')
                }
                c_month--;
                currentMonthDisplay()
            }

        })

        $('#cal-right-switcher').click(function () {
            if (c_month < 11) {
                for (i = 0; i < $('.day-of-week-num').length; i++) {
                    $('.day-of-week-num').eq(i).text('')
                }
                c_month++;
                currentMonthDisplay()
            }
        })

        function getDaySchedule(chosen_day, cinemaID) {
            var chosen_month = c_month;
            var chosen_year = c_year;
            var scheduledDays = schedt.cinemas_schedule[cinemaID].schedule;

            var controller = 0;
            for (t = 0; t < scheduledDays.length; t++) {
                var day_counter = 0;
                var current_day_schedule = scheduledDays[t];
                if (current_day_schedule.year == chosen_year && current_day_schedule.month == chosen_month) {
                    for (g = 0; g < current_day_schedule.days.length; g++) {
                        if (current_day_schedule.days[g] == chosen_day) {
                            day_counter++;
                        }
                    }
                    
                    if (day_counter > 0) {
                        controller++
                        var htmlstring = "";
                        for (n = 0; n < current_day_schedule.current_schedule.length; n++) {
                            let time = current_day_schedule.current_schedule[n].time;
                            let movie = current_day_schedule.current_schedule[n].movie;
                            htmlstring +=
                                ` 
                                <tr>
                                    <td class="schedule-props">${time}</td>
                                    <td class="schedule-props">${movie}</td>
                                </tr>
                            `
                            $('.schedule-info-table').html(htmlstring);
                        }
                        
                    } 
                }
            } 
            if(controller == 0) {
                $('.schedule-info-table').html('<p style="width:350px;font-size:20px; text-align:center;">There is no movie on your date yet</p>\
                                                <p style="width:350px;font-size:20px; text-align:center;">Come back later!</p>')    
                        
            } 
            
            
        }


        

        $('.schedule-button').click(function () {
            $('.schedule-info-table').html('<p style="width:350px;font-size:20px; text-align:center;">There is no movie on your date yet</p>\
                                            <p style="width:350px;font-size:20px; text-align:center;">Come back later!</p>')
            c_date = new Date();
            c_year = c_date.getFullYear()
            c_month = c_date.getMonth();
            c_day = c_date.getDate();
            currentMonthDisplay();
            $('body').css('overflow-y', 'hidden')
            cinemaID = $(this).index('.schedule-button')
            console.log(cinemaID)
            $('.schedule-wrap').css('display', 'block');
            getDaySchedule(c_day, cinemaID)
            $('#schedule-label').html('Schedule on the ' + c_day + "<sup>th</sup> of " + monthNames[c_month])
            

        })

        $('.day-of-week-num').click(function () {
            var chosen_day = parseInt($(this).text());
            getDaySchedule(chosen_day, cinemaID)
            $('#schedule-label').html('Schedule on the ' + chosen_day + "<sup>th</sup> of " + monthNames[c_month])
        })


    }


    vue()




    var ln = $('.poster').length;
    var groups = ln / 3;
    var modal = $('.modal-div')[0];
    var options_div = $("#cities-options-div");

    async function loadData(url) {  /////////////////// Load json file
        const res = await fetch(url);

        if (res.ok) {
            console.log("ok");
        } else {
            console.log("ga");
        }
        return res.json();
    }


    function slideToBlock(i) {
        var i = i;
        var target;
        var time;


        if (i == 0) {
            target = "#movies";
            time = 400;
        } else if (i == 1) {
            target = "#cinemas"
            time = 600;
        } else if (i == 2) {
            target = "#about-us"
            time = 800;
        } else if (i == 3) {
            target = "#contacts"
        }


        $('html, body').stop().animate({
            scrollTop: $(target).offset().top
        }, time)
    }


    $('.nav-butt').click(function () {         ////////////////////// Animation of moving to different pages blocks
        slideToBlock($(".nav-butt").index(this));
    })
    $('.nav-butt-drop').click(function () {         ////////////////////// Animation of moving to dif pages blocks
        slideToBlock($(".nav-butt-drop").index(this));
    })



    for (i = 0; i < groups; i++) {           ///////////////////////// Different margin-top when different amount of posters in a row
        if (i % 2 == 0) {
            for (k = i * 3; k < i * 3 + 3; k++) {
                if (k % 2 == 0) {
                    $('.poster').eq(k).css('margin-top', '120px');

                } else {
                    $('.poster').eq(k).css('margin-top', '60px');

                }
            }

        } else if (i % 2 == 1) {
            for (k = i * 3; k < i * 3 + 3; k++) {
                if (k % 2 == 0) {
                    $('.poster').eq(k).css('margin-top', '60px');

                } else {
                    $('.poster').eq(k).css('margin-top', '120px');

                }
            }
        }
    }

    $('#tbody-position').mousemove((e) => {
        var relativeXPosition = e.pageX - $('#tbody-position').offset().left;
        var relativeYPosition = e.pageY - $('#tbody-position').offset().top;
        var left = relativeXPosition + 'px'
        var top = relativeYPosition + 'px'
        $("#light").css({ "left": left, "top": top })
    })


    $('.day-of-week-num').mouseenter(function () {
        this.style.border = '2px solid rgb(246, 208, 162)'
    })


    $('.day-of-week-num').mouseleave(function () {
        this.style.border = '2px solid rgb(253, 241, 227)'
    })

    $('.calendar-main').mouseenter(function () {
        $('#light').css('display', 'block')
    })


    $('.calendar-main').mouseleave(function () {
        $('#light').css('display', 'none')
    })


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
        $('.mark::after').eq(i).fadeTo(300, 1)
    })

    $(".mark").mouseleave(function () {
        var i = $(this).index();
        $('.mark').eq(i).css('animation', 'slideDown .4s forwards')
        $('.mark::after').eq(i).fadeTo(300, 0)
    })

    $('#close-modal-butt').click(() => {
        $('.modal-div').fadeTo(400, 0).delay(400).queue(function (next) {
            $(this).css('display', 'none');
            next();
        });
        $('body').css('overflow-y', 'scroll')

        let target = $('#trailer-iframe');

        target.attr('src', '');

    })


    window.onclick = function (event) {  ///////////////////////////// Modal div closing by clicking ourside the block
        if (event.target == modal) {
            $('body').css('overflow-y', 'scroll')
            $('.modal-div').fadeTo(400, 0).delay(400).queue(function (next) {
                $(this).css('display', 'none');
                next();
            });


            let target = $('#trailer-iframe');

            target.attr('src', '');

        }
        if (event.target == $('.schedule-wrap')[0]) {
            $('.schedule-wrap').css('display', 'none')
            $('body').css('overflow-y', 'scroll')
        }
    }

    $(document).click(function (event) {
        if (!$(event.target).hasClass('targeter') && $("#cities-options-div").attr('data-opened') == "true") {
            $('#cities-options-div').css('animation', 'dropDownOut 0.4s forwards');
            $('#cities').attr('data-check', "false");
            $("#cities-arrow").css('animation', 'downUpRotate 0.4s forwards')
        }
        if (!$(event.target).hasClass('targeter_2')) {
            $('.dropped-menu').css('animation', 'fadeOutRight 0.4s forwards');

        }
    })

    function screenWidth() {          ////////////////////////////  Resize Poster-div by changing screen width
        if ($(window).width() >= 1283) {
            $('.dropped-menu').css('display', 'none')
            for (i = 0; i < ln; i++) {
                if (i % 3 == 0) {
                    $('.poster-div').eq(i).css("margin-left", '0')
                } else {
                    $('.poster-div').eq(i).css("margin-left", '150px')
                }
            }
        } else if ($(window).width() <= 1282 && $(window).width() >= 1093) {
            $('.dropped-menu').css('display', 'none')
            for (i = 0; i < ln; i++) {
                if (i % 2 == 0) {
                    $('.poster-div').eq(i).css("margin-left", '0')
                } else {
                    $('.poster-div').eq(i).css("margin-left", '250px')
                }
            }

        } else if ($(window).width() <= 1094 && $(window).width() >= 893) {
            $('.dropped-menu').css('display', 'none')
            for (i = 0; i < ln; i++) {
                if (i % 2 == 0) {
                    $('.poster-div').eq(i).css("margin-left", '0')
                } else {
                    $('.poster-div').eq(i).css("margin-left", '100px')
                }
            }
        } else if ($(window).width() <= 892) {
            $('.poster-div').css("margin-left", '20%')
        }
    }


    $(window).resize(function () {
        // console.log($(window).width())
        screenWidth();
    })

    screenWidth();

    $('.centered').click(async function () {             //////////////////////// Poster name clicking function

        $('body').css('overflow-y', 'hidden')

        var id = $(this).attr('data-jsonid');

        var data = await loadData('https://my-json-server.typicode.com/dav-true/dbjson/db');
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
        $('.description').text(data.movies[id].description);

        $('.modal-div').css('display', 'block');
        $('.modal-div').fadeTo(400, 1)

    })




    $("#cities").click(() => {                  ///////////////////////////// Cities drop down list animationW
        if ($('#cities').attr('data-check') == "false") {
            $('#cities').attr('data-check', "true");
            $("#cities-options-div").attr('data-opened', 'true');
            $('#cities-options-div').css('animation', 'dropDown 0.4s forwards');
            $("#cities-arrow").css('animation', 'upDownRotate 0.4s forwards')
        } else if ($('#cities').attr('data-check') == 'true') {
            $('#cities-options-div').css('animation', 'dropDownOut 0.4s forwards');
            $('#cities').attr('data-check', "false");
            $("#cities-arrow").css('animation', 'downUpRotate 0.4s forwards')
            $("#cities-options-div").attr('data-opened', 'false');
        }

    })


    $('.close-butt').click(function () {
        $('.dropped-menu').css('animation', 'fadeOutRight 0.4s forwards');
    })


    $('.menu-butt').click(function () {
        $('.dropped-menu').css('display', 'block');
        $('.dropped-menu').css('animation', 'fadeInRight 0.4s forwards')
    })
    $('#body').show();
})


