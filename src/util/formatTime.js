export const getTime=(index)=>{
    switch(index){
      case 1:return "from 8h to 10h" ;
      case 2:return "from 10h to 12h" ;
      case 3 :return "from 14h to 16h" ;
      case 4:return "from 16h to 18h" ;
      default:return "";
    }
}