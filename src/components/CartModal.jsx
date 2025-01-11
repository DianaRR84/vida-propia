import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";  // Para redirigir al usuario

const CartModal = ({ onClose }) => {
  const { cartItems, totalPrice } = useCart();
  const navigate = useNavigate(); // Hook para la navegación

  // Función para manejar el clic en "Finalizar Compra"
  const handleFinalizePurchase = () => {
    onClose(); // Cierra el modal
    navigate("/checkout"); // Redirige al usuario a la página de pago
  };
  
  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Tu Carrito</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            {cartItems.length === 0 ? (
              <p>El carrito está vacío.</p>
            ) : (
              cartItems.map((item, index) => (
                <div key={index} className="d-flex align-items-center mb-3 border-bottom pb-2">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="img-thumbnail me-3"
                    style={{ width: "60px", height: "60px", objectFit: "cover" }}
                  />
                  <div>
                    <h6 className="mb-0">{item.name}</h6>
                    <small>{item.model}</small>
                  </div>
                  <div className="ms-auto fw-bold">{item.price.toFixed(2)}€</div>
                </div>
              ))
            )}
          </div>

          <div className="modal-footer">
            <h5>Total: {totalPrice.toFixed(2)}€</h5>
            <button type="button" className="btn btn-success w-100">Finalizar Compra</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
