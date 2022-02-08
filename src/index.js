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
    // عندما تتغير كمية المنتج (صفحة الشراء)
    $('[data-product-quantity]').change(function() {
        // اجلب الكمية الجديدة
        var newQuantity = $(this).val();
        // اجلب السطر الذي يحتوي معلومات هذا المنتج
        // السطر الذي يحتوي علي سعر القطعة الواحدة
        var parent = $(this).parents('[data-product-info]');
        // اجلب سعر القطعة الواحدة
        var pricePerUnit = parent.attr('data-product-price');
        // حساب السعر الإجمالي
        var totalPriceForProduct = newQuantity * pricePerUnit;
        // تعيين السعر الإجمالي للمنتج
        parent.find('.total-price-for-product').text(totalPriceForProduct + '$');
        // استدعاء حدث السعر الإجمالي لجميع المنتجات
        //change الإستدعاء يجب ان يكون داخل ال
        calculateTotallPrice();
    });
    // حدث حذف المنتج عند الضغط علي رز الحذف
    $('[data-remove-from-cart]').click(function(){
        $(this).parents('[data-product-info]').remove();
        // استدعاء حدث السعر الإجمالي لجميع المنتجات لحساب السعر مرة اخري
        calculateTotallPrice();
    });
    // اجمالي سعر المنتجات المطلوبة
    function calculateTotallPrice(){
        // متغير جديد (فاضي) لحفظ السعر الإجمالي
        var totallPriceForAllProducts = 0;

        // لكل سطر يمثل معلومات اي منتج في الصفحة function
        $('[data-product-info]').each(function(){
            // اجلب سعر القطعة الواحدة
            var pricePerUnit = $(this).attr('data-product-price');
            // اجلب كمية المنتج من حقل اختيار الكمية
            var quantity = $(this).find('[data-product-quantity]').val();

            var totalPriceForProduct = pricePerUnit * quantity;

            // اضف السعر الإجمالي لهذا المنتج الي السعر الإجمالي لكل المنتجات 
            totallPriceForAllProducts = totallPriceForAllProducts + totalPriceForProduct;
        });

        // حدث السعر الإجمالي لكل المنتجات في الصفحة
        $('#total-price-for-all-products').text(totallPriceForAllProducts + 'دولار');

    }
});
// document.getElementById("copyright").innerHTML = ('جميع الحقوق محفوظة ' + new Date().getFullYear());










