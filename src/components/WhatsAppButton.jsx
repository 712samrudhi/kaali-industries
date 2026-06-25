import { FaWhatsapp } from "react-icons/fa";

function WhatsAppButton(){

  const phoneNumber = "917030056556"; 
  // इथे तुझा WhatsApp नंबर टाक (91 + नंबर)

  const message = "Hello";

  const whatsappLink =
  `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <>
      <a
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
        className="whatsapp-btn"
      >
        <FaWhatsapp />
      </a>

      <style>
        {`
        .whatsapp-btn{
          position:fixed;
          right:25px;
          bottom:25px;
          width:60px;
          height:60px;
          border-radius:50%;
          background:#25D366;
          color:white;
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:35px;
          text-decoration:none;
          z-index:999;
        }

        .whatsapp-btn:hover{
          transform:scale(1.1);
        }
        `}
      </style>
    </>
  );
}

export default WhatsAppButton;