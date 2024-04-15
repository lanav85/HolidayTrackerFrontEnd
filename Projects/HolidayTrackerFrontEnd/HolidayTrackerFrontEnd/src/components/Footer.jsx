
function Footer() {
  return (
    <footer style={{ 
      position: 'fixed',
      bottom: 0,
      left: '250px', 
      width: 'calc(100% - 250px)', //it will take all the horizontal space of the conteiner minus the 250px from the sidebar
      textAlign: 'center', 
      fontSize: '10px',
      zIndex: 999 // specifies the stack order of an element. This ensures that the footer appears above other elements on the page.
    }}>
      <p>&copy; {new Date().getFullYear()} Holiday Tracker</p>
    </footer>
  );
}

export default Footer;
