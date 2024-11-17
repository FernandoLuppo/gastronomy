export const template = (name: string, securityCode: string): string => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet"
        />

        <title>Document</title>
        <style>
          body {
            width: 800px;
            margin: 0;
            font-family: "Inter", sans-serif;
          }
          .wallpaper {
            height: 50vh;
            background-color: #7b1d20;
          }
          table {
            border-spacing: 0;
          }
          td {
            padding: 0;
          }
          img {
            border: 0;
          }
          .wrapper {
            display: flex;
            width: 100%;
            table-layout: fixed;
          }
          .main {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            border-spacing: 0;
            color: #000;
          }
          .card {
            margin: 20px;
            padding: 20px;
            background: #ffffff;
            border-radius: 16px;
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
            border: 1px solid #f2f2f2;
          }
          .title {
            color: #262626;
          }
          .text {
            color: #333333;
          }
          .code {
            text-align: center;
            text-decoration: underline;
            color: #7b1d20;
          }
        </style>
      </head>
      <body>
        <center class="wrapper wallpaper">
          <table class="main" width="100%">
            <tr>
              <td>
                <div class="card">
                  <h2 class="title">Password change request.</h2>
                  <p class="text">
                    Hello ${name} there was a request to change your password at
                    LuppoTW Gastronomy Website.
                  </p>
                  <p class="text">
                    If you did not make this request, then ignore this email,
                    otherwise, use the code below to change your password:
                  </p>
                  <h3 class="code">${securityCode}</h3>
                </div>
              </td>
            </tr>
          </table>
        </center>
      </body>
    </html>
  `
  return html
}
