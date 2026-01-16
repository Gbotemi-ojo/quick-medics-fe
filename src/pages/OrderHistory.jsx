import { useEffect, useState } from "react";
import { Container, Table, Badge, Card } from "react-bootstrap";
import { fetchMyOrders } from "../api";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
  useWindowScrollToTop();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
        navigate("/login");
        return;
    }

    const loadOrders = async () => {
        try {
            const result = await fetchMyOrders();
            if(result.success && result.data) {
                setOrders(result.data);
            }
        } catch (error) {
            console.error("Failed to load orders", error);
        } finally {
            setLoading(false);
        }
    };
    loadOrders();
  }, [isAuthenticated, navigate]);

  // Helper for Badge Colors
  const getStatusBadge = (status) => {
    switch (status) {
        case 'paid': return 'success';       // Green
        case 'shipped': return 'info';       // Blue
        case 'delivered': return 'primary';  // Dark Blue
        case 'pending': return 'warning';    // Yellow
        case 'cancelled': return 'danger';   // Red
        default: return 'secondary';
    }
  };

  if (loading) return <div className="text-center py-5">Loading orders...</div>;

  return (
    <Container className="py-5" style={{ minHeight: "80vh" }}>
      <h2 className="mb-4 text-primary" style={{color: '#0f3460'}}>My Order History</h2>
      
      {orders.length === 0 ? (
          <div className="p-5 text-center border rounded bg-light">
              <h4>No orders found</h4>
              <p>You haven't placed any orders yet.</p>
          </div>
      ) : (
          orders.map(order => (
              <Card key={order.id} className="mb-4 shadow-sm border-0">
                  <Card.Header className="bg-white d-flex justify-content-between align-items-center">
                      <div>
                          <strong>Order #{order.id}</strong>
                          <span className="text-muted small ms-2">
                              {new Date(order.createdAt).toLocaleDateString()}
                          </span>
                      </div>
                      <Badge bg={getStatusBadge(order.status)}>
                        {order.status.toUpperCase()}
                      </Badge>
                  </Card.Header>
                  <Card.Body>
                      <Table responsive borderless size="sm">
                          <thead>
                              <tr className="border-bottom">
                                  <th>Product</th>
                                  <th>Qty</th>
                                  <th className="text-end">Price</th>
                              </tr>
                          </thead>
                          <tbody>
                              {order.items.map(item => (
                                  <tr key={item.id}>
                                      <td>{item.productName}</td>
                                      <td>x{item.quantity}</td>
                                      <td className="text-end">₦{Number(item.price).toLocaleString()}</td>
                                  </tr>
                              ))}
                          </tbody>
                      </Table>
                      <hr />
                      <div className="d-flex justify-content-between align-items-center">
                          <small className="text-muted">Delivered to: {order.deliveryAddress}</small>
                          <h5 className="mb-0">Total: ₦{Number(order.totalAmount).toLocaleString()}</h5>
                      </div>
                  </Card.Body>
              </Card>
          ))
      )}
    </Container>
  );
};

export default OrderHistory;
