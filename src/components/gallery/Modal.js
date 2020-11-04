function ModalInFunctionalComponent (){

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const setModalIsOpenToTrue =()=>{
        setModalIsOpen(true)
    }

    return(
        <>
           <button onClick={setModalIsOpenToTrue}>Click to View My Favourite Animes</button>
        </>
    )
}

export default ModalInFunctionalComponent