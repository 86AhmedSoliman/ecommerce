import '@laylazi/bootstrap-rtl/dist/css/bootstrap-rtl.min.css';
import './Css/style.css';
import 'webpack-jquery-ui/css';
import 'webpack-jquery-ui';
import 'bootstrap/dist/js/bootstrap.min.js';//import 'bootstrap';
import 'jquery/dist/jquery.min';
import 'popper.js/dist/popper.min';
import '@fortawesome/fontawesome-free/js/all.min';
import 'webpack-jquery-ui';
import 'webpack-jquery-ui/css';
import 'jquery-ui-touch-punch/jquery.ui.touch-punch.min.js';


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
    var citiesByCountry = {
        sa: ['الرياض','جدة'],
        eg: ['القاهرة','الإسكندرية'],
        jo: ['عمان','الزرقاء'],
        sy: ['دمشق','حلب','حماة']
    };
    // عندما يتغير البلد
    $('#form-checkout select[name="country"]').change(function(){

        // اجلب رمز البلد
        var country = $(this).val();

        // اجلب مدن هذا البلد من المصفوفة
        var cities = citiesByCountry[country];

        // فرغ قائمة المدن تماما
        $('#form-checkout select[name="city"]').empty();

        // إضافة خيار إختر المدينة
        $('#form-checkout select[name="city"]').append(
            '<option disabled selected value="">إختر المدينة</option>'
        );  
        
        // أضف المدن إلي قائمة المدن
        cities.forEach(function(city){
            var newOption = $('<option></option>');
            newOption.text(city);
            newOption.val(city);
            $('#form-checkout select[name="city"]').append(newOption);
        })
    });
    // عندما تتغير طريقة الدفع
    $('#form-checkout input[name="payment-method"]').change(function(){

        // إجلب القيمة المختارة حاليا
        var paymentMethod = $(this).val();

        // إذا كانت القيمة عند الإستلام
        if(paymentMethod === 'on-delivery'){

            // عطل حقول بطاقة الإئتمان
            $('#credit-card-info input').prop('disabled', true);

        } else {
            // وإلا فعلها
            $('#credit-card-info input').prop('disabled', false);
        }
        // بدل معلومات بطاقة الإئتمان بين الظهور والإخفاء
        $('#credit-card-info').toggle();
    });

    // مكون البحث حسب السعر
    $( "#price-range" ).slider({
        range: true, // هيظهر مقبض واحد للتحكم false اذا كان
        min: 50,
        max: 1000,
        step: 50,
        values: [ 250, 800 ],
        slide: function( event, ui ) {
            $( "#price-min" ).text( ui.values[ 0 ]);//0 تمثل القيمة الصغري
            $( "#price-max" ).text( ui.values[ 1 ]);//1 تمثل القيمة الكبري
        }
    });
});
// document.getElementById("copyright").innerHTML = ('جميع الحقوق محفوظة ' + new Date().getFullYear());










