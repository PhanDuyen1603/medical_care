import { Modal } from 'antd';
const UseModal = (props) => {
    const { children, title, isModaOpen, handleCancel, handleOk, zIndex = 1000 } = props
    return (
        <Modal zIndex={zIndex} title={title} open={isModaOpen} onOk={handleOk} onCancel={handleCancel} {...props} >
            {children}
        </Modal>
    )
}

export default UseModal