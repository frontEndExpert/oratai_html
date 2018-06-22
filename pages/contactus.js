import App from '../components/App'

export default () => (
  <App>
      <div className='ourinfo'>
        <h1>Contact Us</h1>
        <hr/>
        <h2 >www.orataiphathai.com</h2>
        <h2 >Line @: <a href="line://ti/p/nadea.s">@nadea.s</a></h2>
        <h2 >Tel: 084-1200065 </h2>
        <h2 >Email: <a href="mailto:nadea_2422@hotmail.com">nadea_2422@hotmail.com</a></h2>
        <h2 >Address 222/75 Village Areeya The Color Bangna km 8 Bangplee Bangplee Samutprakarn 10540</h2>
      </div>
      <style jsx>{`
        .ourinfo {
          display: block;
          margin: 0px;
          padding: 20px;
          background-color: #222222;
          color: white;
        }
        h1 {
          font-size: 34px;
        }
        
        h2 {
          font-size: 18px;
        }
      `}</style>
  </App>
)