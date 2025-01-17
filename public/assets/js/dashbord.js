

const hasSubmenus = document.querySelectorAll('.has-submenu');
      function toggleNavLinkClass(event) {
      const clickedSubMenu = event.currentTarget;
      clickedSubMenu.classList.toggle('new-menu');
      }
      hasSubmenus.forEach(submenu => {
      submenu.addEventListener('click', toggleNavLinkClass);
      });
           // Loader
 var myVar;
   
   function loader() {
       myVar = setTimeout(showPage);
   }
   
   function showPage() {
       document.getElementById("preloader").style.display = "none";
   }
 
    // loder-end

$(document).ready(function(){
  $('.toggle').click(function(){
    $('body').toggleClass('resize-menu');
  });
$('.counter').each(function(){
        $(this).prop('Counter',0).animate({
            Counter: $(this).text()
        },{
            duration: 3500,
            easing: 'swing',
            step: function (now){
                $(this).text(Math.ceil(now));
            }
        });
    });

});
       document.addEventListener("DOMContentLoaded", function(){
  document.querySelectorAll('.nav-menu .nav-link').forEach(function(element){
    
    element.addEventListener('click', function (e) {

      let nextEl = element.nextElementSibling;
      let parentEl  = element.parentElement; 

        if(nextEl) {
            e.preventDefault();  
            let mycollapse = new bootstrap.Collapse(nextEl);
            
            if(nextEl.classList.contains('show')){
              mycollapse.hide();
            } else {
                mycollapse.show();
                // find other submenus with class=show
                var opened_submenu = parentEl.parentElement.querySelector('.submenu.show');
                // if it exists, then close all of them
                if(opened_submenu){
                  new bootstrap.Collapse(opened_submenu);
                }
            }
        }
    }); // addEventListener
  }) // forEach
}); 

   


let ctx = document.getElementById("chart").getContext('2d');

var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
gradientStroke.addColorStop(0, "#ff6c00");
gradientStroke.addColorStop(1, "#ff3b74");

var gradientBkgrd = ctx.createLinearGradient(0, 100, 0, 400);
gradientBkgrd.addColorStop(0, "rgba(244,94,132,0.2)");
gradientBkgrd.addColorStop(1, "rgba(249,135,94,0)");

let draw = Chart.controllers.line.prototype.draw;
Chart.controllers.line = Chart.controllers.line.extend({
    draw: function() {
        draw.apply(this, arguments);
        let ctx = this.chart.chart.ctx;
        let _stroke = ctx.stroke;
        ctx.stroke = function() {
            ctx.save();
            //ctx.shadowColor = 'rgba(244,94,132,0.8)';
            ctx.shadowBlur = 8;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 6;
            _stroke.apply(this, arguments)
            ctx.restore();
        }
    }
});




var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"],
        datasets: [{
            label: "Income",
            backgroundColor: gradientBkgrd,
            borderColor: gradientStroke,
            data: [5500, 2500, 10000, 6000, 14000, 1500, 7000,20000],
            pointBorderColor: "rgba(255,255,255,0)",
            pointBackgroundColor: "rgba(255,255,255,0)",
            pointBorderWidth: 0,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: gradientStroke,
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 4,
            pointRadius: 1,
            borderWidth: 5,
            pointHitRadius: 16,
        }]
    },

    // Configuration options go here
    options: {
      tooltips: {
        backgroundColor:'#fff',
        displayColors:false,
           titleFontColor: '#000',
        bodyFontColor: '#000'
        
        },      
      legend: {
            display: false
      },
        scales: {
            xAxes: [{
                gridLines: {
                    display:false
                }
            }],
            yAxes: [{
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(value, index, values) {
                        return (value / 1000) + 'K';
                    }
                }
            }],
        }
    }
});


