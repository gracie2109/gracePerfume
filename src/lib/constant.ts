import image1 from "@/assets/images/sliders/1.jpg";
import image2 from "@/assets/images/sliders/2.jpg"
import image3 from "@/assets/images/sliders/3.jpg";
import image4 from "@/assets/images/sliders/4.jpg"
import image5 from "@/assets/images/sliders/5.jpg";
import tech from "@/assets/logo/techcombank.png";
import acb from "@/assets/logo/acb.png";
import cod from "@/assets/payment_method/cod.svg"
import transfer from "@/assets/payment_method/transfer.svg"
import googleIcon from "@/assets/provider/google.svg"
import facebookIcon from "@/assets/provider/facebook.svg"


export const carouselImages = [image1, image2, image3, image4, image5];


export const baseMethods = ['CREATE', 'READ', 'DELETE', 'UPDATE'];


export const baseAttribute = ['10ml', '20ml', '75ml', '90ml', '110ml'];

export const baseFilter = [
    {value: 'newest', name: 'Newest'},
    {value: 'ads', name: 'Lower price'},
    {value: 'esc', name: 'Higher price'},
    {value: 'nameAsd', name: 'Name: A-Z'},
    {value: 'nameEsc', name: 'Name: Z-A'},
    {value: 'oldest', name: 'Oldest'},
    {value: 'best_selling', name: 'Best selling'},
];


export const listFaq = [
    {
        q: 'Làm thế nào để tôi đặt hàng online?',
        a: 'Mode Fashion rất vui lòng hỗ trợ khách hàng đặt hàng online bằng một trong những cách đặt hàng sau:\n' +
            '- Truy cập trang web: Mode Fashion\n' +
            '- Gửi email đặt hàng về địa chỉ: hi@modefashion.com\n' +
            '- Liên hệ số hotline: 1900.636.000 để đặt sản phẩm\n' +
            '- Chat với tư vấn viên trên fanpage của Mode'
    },
    {
        q: 'Nếu tôi đặt hàng trực tuyến có những rủi ro gì không?',
        a: 'Với Mode, khách hàng không phải lo lắng, vì chúng tôi cam kết cung cấp sản phẩm chất lượng tốt, giá cả phải chăng. Đặc biệt, khách hàng sẽ nhận được sản phẩm và thanh toán cùng một thời điểm.'
    },
    {
        q: 'Nếu tôi mua sản phẩm với số lượng nhiều thì giá có được giảm không?',
        a: 'Khi mua hàng với số lượng nhiều khách hàng sẽ được hưởng chế độ ưu đãi, giảm giá ngay tại thời điểm mua hàng.<br />' +
            'Khách hàng vui lòng liên hệ Mode để được hỗ trợ trực tiếp qua số điện thoại: 1900.636.000'
    }
]


export const basePaymentMethods = [
    {
        name: 'CASH',
        img: cod
    },
    {
        name: 'TRANSFER',
        img: transfer
    }
]

export const baseBanks = [
    {
        id: 'techcombank',
        name: 'Techcombank',
        bankLogo: tech,
        bankQr: import.meta.env.VITE_APP_QR_TECH
    },
    {
        id: 'acb',
        name: 'ACB',
        bankLogo: acb,
        bankQr: import.meta.env.VITE_APP_QR_ACB
    }
]


export const providerGate = [
     {
        name: ' GOOGLE   ',
        img: googleIcon,
        providerId: 'google.com'
    },
   {
        name: ' GOOGLE   ',
        img: facebookIcon,
        providerId: 'facebook.com'
    }
]