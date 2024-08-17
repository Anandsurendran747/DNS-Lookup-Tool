import { useState,useEffect } from 'react'
import axios from 'axios';
import './App.css';
import Dns from './components/Dns';

function App() {
  const [count, setcount] = useState([1])
  const [showCHart, setshowCHart] = useState(false)
  const [data, setData] = useState([]);
  
  useEffect(() => {
    setcount(count)
  }, [count])
  
  
  function addForm() {
    setcount([...count, count.length + 1])
  }
  function removeForm(item) {
    console.log(item);
    let index = count.indexOf(item)
    let arr = count.slice()
    arr.splice(index, 1)
    console.log(count);
    
    setcount(arr)
  }
  async function submitForm() {
    let domains = [];

    count.map(i => {
      domains.push({
        dns: document.getElementById(`${i}dns`).value,
        type: document.getElementById(`${i}type`).value
      })

    })

    const res = await axios.post('http://localhost:3000/', domains)
    console.log(res.data);
    console.log(count);


    if (res.data.length == count.length) {
      console.log(res.data);

      setshowCHart(true)
      setData(res.data)
    } else {
      alert('Enter valid dns or type')
    }



  }
  return (
    <div className="App">

      <div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '500px'
      }}>
        <h2>DNS LOOKUP TOOL</h2>
        {
          count.map(item => (
            <div key={item} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', margin: '5px' }}>
              <input style={{ flex: '2' }} id={item + "dns"} placeholder='Enter dns' type='text' />
              <select style={{ flex: '1' }} id={item + "type"} placeholder='Enter type' >
                <option value={'A'} >A</option>
                <option value={'AAAA'}>AAAA</option>
                <option value={'CNAME'}>CNAME</option>
                <option value={'MX'}>MX</option>
              </select>
              {item > 1 && (<button id={item+'r'} onClick={() => removeForm(item)}>Remove</button>)}
            </div>
          ))
        }
        <button style={{ backgroundColor: 'green', color: 'white', margin: '5px' }} onClick={addForm}>Add Another</button>
        <input style={{ margin: '5px' }} onClick={submitForm} type='submit' />
      </div>

      <div>

        {
          showCHart && (
            <Dns data={data} />
          )
        }
      </div>
    </div>
  );
}

export default App;
