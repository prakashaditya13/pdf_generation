const PDFbtn = document.querySelector('.pdf_btn')

PDFbtn.addEventListener('click', (e) => {
    e.preventDefault()
    //Get a data from database using Asynchronous method

    fetch('http://localhost/pdf_generation/db/sample-data.json')
    //Ssample API request for PDF Data
    //Use for different CORS origin use mode: 'no-cors' policy
        .then(res => res.json())
        .then(data => generatePDF(data))
        .catch(error => {
            console.log(error)
        })
})

const generatePDF = (result) => {
    //Generating PDF for Invoices
    //Getting a useful Raw data from result and stored into a new Object
    var raw_data = {
        invoice_no: result.Invoice[0].Inv_no,
        created_at: result.Invoice[0].created_At,
        due_date: result.Invoice[0].due_date,
        customer_name: result.Invoice[0].customer[0].Cust_name,
        cust_addr: result.Invoice[0].customer[0].address,
        cust_email: result.Invoice[0].customer[0].email,
        comp_name: result.Invoice[0].company[0].comp_name,
        comp_addr: result.Invoice[0].company[0].address,
        comp_email: result.Invoice[0].company[0].email,
    }

    //Generating Template for PDF using HTML template
    var PDF_temp = `<!doctype html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>A simple, clean, and responsive HTML invoice template</title>
        
        <style>
        .invoice-box {
            max-width: 800px;
            margin: auto;
            padding: 30px;
            border: 1px solid #eee;
            box-shadow: 0 0 10px rgba(0, 0, 0, .15);
            font-size: 16px;
            line-height: 24px;
            font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
            color: #555;
        }
        
        .invoice-box table {
            width: 100%;
            line-height: inherit;
            text-align: left;
        }
        
        .invoice-box table td {
            padding: 5px;
            vertical-align: top;
        }
        
        .invoice-box table tr td:nth-child(2) {
            text-align: right;
        }
        
        .invoice-box table tr.top table td {
            padding-bottom: 20px;
        }
        
        .invoice-box table tr.top table td.title {
            font-size: 45px;
            line-height: 45px;
            color: #333;
        }
        
        .invoice-box table tr.information table td {
            padding-bottom: 40px;
        }
        
        .invoice-box table tr.heading td {
            background: #eee;
            border-bottom: 1px solid #ddd;
            font-weight: bold;
        }
        
        .invoice-box table tr.details td {
            padding-bottom: 20px;
        }
        
        .invoice-box table tr.item td{
            border-bottom: 1px solid #eee;
        }
        
        .invoice-box table tr.item.last td {
            border-bottom: none;
        }
        
        .invoice-box table tr.total td:nth-child(2) {
            border-top: 2px solid #eee;
            font-weight: bold;
        }
        
        @media only screen and (max-width: 600px) {
            .invoice-box table tr.top table td {
                width: 100%;
                display: block;
                text-align: center;
            }
            
            .invoice-box table tr.information table td {
                width: 100%;
                display: block;
                text-align: center;
            }
        }
        
        /** RTL **/
        .rtl {
            direction: rtl;
            font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
        }
        
        .rtl table {
            text-align: right;
        }
        
        .rtl table tr td:nth-child(2) {
            text-align: left;
        }
        </style>
    </head>
    
    <body>
        <div class="invoice-box">
            <table cellpadding="0" cellspacing="0">
                <tr class="top">
                    <td colspan="2">
                        <table>
                            <tr>
                                <td class="title">
                                    <img src="https://www.sparksuite.com/images/logo.png" style="width:100%; max-width:300px;">
                                </td>
                                
                                <td>
                                    Invoice #: ${raw_data.invoice_no}<br>
                                    Created: ${raw_data.created_at}<br>
                                    Due: ${raw_data.due_date}
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                
                <tr class="information">
                    <td colspan="2">
                        <table>
                            <tr>
                                <td>
                                    ${raw_data.customer_name}<br>
                                    ${raw_data.cust_addr}<br>
                                    ${raw_data.cust_email}
                                </td>
                                
                                <td>
                                    ${raw_data.comp_name}<br>
                                    ${raw_data.comp_addr}<br>
                                    ${raw_data.comp_email}
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                
                <tr class="heading">
                    <td>
                        Payment Method
                    </td>
                    
                    <td>
                        Check #
                    </td>
                </tr>
                
                <tr class="details">
                    <td>
                        Check
                    </td>
                    
                    <td>
                        1000
                    </td>
                </tr>
                
                <tr class="heading">
                    <td>
                        Item
                    </td>
                    
                    <td>
                        Price
                    </td>
                </tr>
                
                <tr class="item">
                    <td>
                        Website design
                    </td>
                    
                    <td>
                        $300.00
                    </td>
                </tr>
                
                <tr class="item">
                    <td>
                        Hosting (3 months)
                    </td>
                    
                    <td>
                        $75.00
                    </td>
                </tr>
                
                <tr class="item last">
                    <td>
                        Domain name (1 year)
                    </td>
                    
                    <td>
                        $10.00
                    </td>
                </tr>
                
                <tr class="total">
                    <td></td>
                    
                    <td>
                       Total: $385.00
                    </td>
                </tr>
            </table>
        </div>
    </body>
    </html>`
    html2pdf().from(PDF_temp).save();

}
