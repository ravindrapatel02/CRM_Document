import Swal from "sweetalert2";
import ReviewSubmit from "../ReviewSubmit";
import { useRouter } from "next/router";
 

const SwalFire = (message2 , title) => {
    const router = useRouter();
    Swal.fire({
        title: message2,
        text: title,
        icon: 'success',
        showCancelButton: true,
        allowOutsideClick :false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok'
      }).then((result) => {
        if (result.isConfirmed) {
            // ReviewSubmit() 
          router.push({
            pathname: '/answer-sheet/[responseCode]',
            query: { responseCode: obj.responseCode, setId: obj.setId },
          });
         
        } else {
          router.push('/');
        }
      })
}

export default SwalFire