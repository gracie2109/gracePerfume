import image1 from "@/assets/images/sliders/1.jpg";
import image2 from "@/assets/images/sliders/2.jpg"
import image3 from "@/assets/images/sliders/3.jpg";
import image4 from "@/assets/images/sliders/4.jpg"
import image5 from "@/assets/images/sliders/5.jpg";




export const carouselImages = [image1,image2,image3,image4,image5];


export const baseMethods = ['CREATE','READ','DELETE','UPDATE'];


export const baseAttribute = ['10ml','20ml','75ml', '90ml','110ml'];

export const baseFilter = [
    {  value: 'newest', name:'Newest' },
    {  value: 'ads', name:'Lower price' },
    {  value: 'esc', name:'Higher price' },
    {  value: 'nameAsd', name:'Name: A-Z' },
    {  value: 'nameEsc', name:'Name: Z-A' },
    {  value: 'oldest', name:'Oldest' },
    {  value: 'best_selling', name:'Best selling' },
]