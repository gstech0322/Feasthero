import { Spinner, Modal } from "react-bootstrap";

import './loader.scss'


function Loader({ show, variant }) {
    return (
        <Modal onHide={() => { }} centered contentClassName='loading-modal' show={show}>
            <Spinner className='m-auto' variant={variant ? variant : 'primary'} animation='grow' />
        </Modal>
    )
}

export default Loader