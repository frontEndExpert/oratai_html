import App from '../components/App'

export default () => (
  <App>
    <div className="headbox" >
      <h1 className="bigheader">Privacy Policy</h1>
      <h2>Here at orataiphathai.com we value your privacy. </h2>
      <p>We do not sell, rent, loan, or give your email address or other personal information to anybody
      and will never do so. This includes our Facebook page and group.</p>
      <h2>Collection of your Personal Information:</h2>
      <p>You can visit most pages on our site without giving us any information about yourself. But sometimes we do need information to provide services that you request, and this privacy policy explains data collection and use in those situations.
      </p>
      <p>This privacy policy covers our treatment of personally identifiable information that we collect when you are on our site, and when you use our services.
      We pledge to hold all information you provide to us in absolute privacy.
      We will not sell or rent your name or personal information to any third party without your express permission.
      We never sell or rent our mailing list.
      Only authorized employees may access your information.
      All employees are required to adhere to our strict privacy policies and any employee who violates the privacy policy is subject to termination and other disciplinary measures.
      </p>
      <h2>Log Files:</h2>
      <p>As with most other websites, we collect and use the data contained in log files. The information in the log files include your IP (internet protocol) address, your ISP (internet service provider), the browser you used to visit our site (such as Internet Explorer or Firefox), the time you visited our site and which pages you visited throughout our site.
      </p>
      <h2>Cookies:</h2>
      <p>We do use cookies to store information, such as your personal preferences when you visit our site. We do not store any personally identifiable information in these cookies.
      </p>
      <h2>Third Party Advertisements – Visitor Information and Cookies:</h2>
      <p>In the future we may use third party advertisements on orataiphathai.com. Some of these advertisers may use technology such as cookies when they advertise on our site, which will also send these advertisers (such as Google through the Google AdSense program) information including your IP address, your ISP, the browser you used to visit our site, and in some cases, whether you have Flash installed. This is generally used for geo-targeting purposes (showing ads relevant to your locality) or showing certain ads based on specific sites visited (such as showing cooking ads to someone who frequents cooking sites).</p>
      <p>You can choose to disable or selectively turn off our cookies or third-party cookies in your browser settings, or by managing preferences in programs such as Norton Internet Security. However, this can affect how you are able to interact with our site as well as other websites.</p>
      
      <h2>Protection of Children’s Personal Information:</h2>
      <p>orataiphathai.com is a general audience site and does not knowingly collect any personal information from children. While our website may be viewed by children, we do not wish to receive data from children. orataiphathai.com encourages parents and guardians to spend time online with their children and to participate in the interactive activities offered on the sites their children visit. No information should be submitted to, or posted at, the orataiphathai.com web site by visitors under 18 years of age without the consent of their parent or guardian.
      </p>
      <h2>Links to Third Party Sites:</h2>
      <p>This website may contain links to other web sites that are not controlled by orataiphathai.com ("Third Party Sites"). Please be aware that we are not responsible for the privacy practices of such other sites. We encourage our users to be aware when they leave our site and to read the privacy statements of each and every website that collects personally identifiable information. The orataiphathai.com Privacy Policy applies solely to information collected by this website.
      </p>
      <h2>Changes to this Privacy Policy:</h2>
      <p>orataiphathai.com will occasionally update this privacy policy. For material changes to this statement, orataiphathai.com will notify our users by placing prominent notice on the site.</p>
      <p>Enforcement of this Privacy Policy and Contact Information:</p>
      <p>orataiphathai.com welcomes your comments regarding our privacy policy. For any comments, feel free to contact us via our "Contact Us" page.</p>
    </div>
    <style jsx>{`
    .headbox {
      display: block;
      width: 100%;
      max-width: 800px;
      padding:20px;
    }
    .bigheader {
      font-size: 24px;
      font-weight: bold;
      text-align: center;
      color: white;
    }
    .headbox > h2 {
      font-size: 18px;
      font-weight: bold;
      color: white;
    }
    p {
      font-size: 14px;
      font-weight: normal;
      color: white;
    }
    `}
    </style>
  </App>
)