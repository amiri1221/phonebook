const Colorfull = (WrappedComponet) => {
   const colors=[
    "info",
    "dark",
    "danger"
   ]
   let randome = colors[Math.floor(Math.random() * 3)]
   const className= `bg-${randome}`

   return(props)=>{
    return(
        <div className={className}>
            <WrappedComponet {...props}/>
        </div>
    )
   }
}
export default Colorfull;