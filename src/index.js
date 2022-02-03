import '@laylazi/bootstrap-rtl/dist/css/bootstrap-rtl.min.css';
import './Css/style.css';
import 'webpack-jquery-ui/css';
import 'webpack-jquery-ui';
import 'bootstrap/dist/js/bootstrap.min.js';//import 'bootstrap';
import 'jquery/dist/jquery.min';
import 'popper.js/dist/popper.min';
import '@fortawesome/fontawesome-free/js/all.min';


$(function() {
    $('[data-bs-toggle="tooltip"]').tooltip();
    
    $('.add-to-cart-btn').click(function(){
        alert('أضيف المنتج إلي عربة الشراء');
    });
    $("#copyright").text( 'جميع الحقوق محفوظة ' + (new Date).getFullYear() );
    // اختيار المقاسات والالوان في صفحة المنتج
    $('.product-option input[type="radio"]').change(function(){
        $(this).parents('.product-option').siblings().removeClass('active');
        $(this).parents('.product-option').addClass('active');
    });
});
// document.getElementById("copyright").innerHTML = ('جميع الحقوق محفوظة ' + new Date().getFullYear());



