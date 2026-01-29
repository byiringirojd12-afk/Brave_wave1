import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import "./Lesson.css"

const App = () => {
  return (
    <div className="internet-society-container">
      <h1>The Internet Society: Building the Foundations of the Digital World</h1>

      <section className="intro">
        <p>
          The internet is an essential part of modern life. It powers communication, commerce, education, and entertainment—connecting billions of people around the globe. But how does the internet actually work, and what does it need to function smoothly and securely? Behind the scenes, a range of organizations, technologies, and infrastructure come together to make the internet possible.
        </p>
        <p>
          In this section, we’ll explore The Internet Society (ISOC), an organization dedicated to the promotion and development of the internet, and discuss the key elements that make the internet exist and continue to grow.
        </p>
      </section>

      <section className="definition">
        <h2>What is The Internet Society?</h2>
        <p>
          <strong>Definition:</strong> The Internet Society (ISOC) is a global nonprofit organization founded in 1992 to promote the open development, evolution, and use of the internet for the benefit of all people around the world. ISOC's mission is to ensure that the internet remains a global public resource, open, accessible, and secure for all users.
        </p>
      </section>

      <section className="goals">
        <h2>Key Goals of the Internet Society:</h2>
        <ul>
          <li>Advocate for policies that support the internet as a global public resource.</li>
          <li>Ensure the internet remains secure, resilient, and accessible.</li>
          <li>Promote the development and implementation of internet standards.</li>
          <li>Support the growth of the internet in underserved areas and foster global collaboration.</li>
        </ul>
      </section>

      <section className="core-elements">
        <h2>The Core Elements Needed for the Internet to Exist</h2>
        <p>
          The internet relies on several key elements to function properly. These include the technical infrastructure, legal frameworks, social acceptance, and governance structures that ensure the internet remains an open and accessible resource for all users. Let's explore these core elements.
        </p>
        <ol>
          <li>
            <strong>Infrastructure: The Physical Backbone of the Internet</strong>
            <p>
              The internet depends on a complex, global network of physical infrastructure that connects millions of devices. Without this infrastructure, the internet as we know it would not exist. This includes:
            </p>
            <ul>
              <li><strong>Data Centers:</strong> Massive facilities that store and manage the data that flows through the internet. They house the servers that host websites, applications, and services.</li>
              <li><strong>Internet Exchange Points (IXPs):</strong> Locations where different internet networks connect and exchange data. These help ensure the smooth transfer of data between different service providers.</li>
              <li><strong>Undersea Cables:</strong> High-capacity fiber-optic cables that run beneath the ocean to connect continents, facilitating global communication and data exchange.</li>
              <li><strong>Routers and Switches:</strong> These devices direct internet traffic, ensuring that data sent from one device reaches its intended destination efficiently and securely.</li>
            </ul>
            <p>
              Without this infrastructure, the digital ecosystem would be fragmented and unable to operate at scale.
            </p>
          </li>
          <li>
            <strong>Internet Protocols: The Language of the Internet</strong>
            <p>
              The internet works because of standardized protocols, which are sets of rules that allow devices to communicate with one another. These protocols define how data is transmitted across the internet, ensuring that it can flow seamlessly between different networks and devices. Key protocols include:
            </p>
            <ul>
              <li><strong>IP (Internet Protocol):</strong> The fundamental protocol that enables devices to identify and communicate with each other over the internet. Every device connected to the internet has a unique IP address that allows it to send and receive data.</li>
              <li><strong>TCP/IP (Transmission Control Protocol/Internet Protocol):</strong> The suite of protocols that ensure data is reliably transmitted from one device to another. TCP handles the correct sequencing of data packets, while IP directs the packets to the right location.</li>
              <li><strong>HTTP/HTTPS (Hypertext Transfer Protocol):</strong> The protocols used for transferring web pages. HTTPS ensures secure communication between your browser and the server, protecting sensitive data like passwords and credit card information.</li>
            </ul>
            <p>
              These protocols allow devices to communicate globally, making the internet a universal network.
            </p>
          </li>
          <li>
            <strong>Domain Names and IP Addressing: The Addressing System of the Internet</strong>
            <p>
              To access any website, you need to know its domain name (like www.example.com). But behind every domain name, there’s a corresponding IP address that identifies the physical location of the website’s server. This system is known as Domain Name System (DNS).
            </p>
            <p>
              <strong>ICANN (Internet Corporation for Assigned Names and Numbers):</strong> ICANN manages domain names and IP addresses to ensure that they are globally coordinated and unique. It’s responsible for maintaining the DNS system that helps route internet traffic to the correct destinations.
            </p>
            <p>
              Without DNS, it would be impossible to find websites by their human-readable names. Instead, you would need to memorize the numerical IP addresses of every website, which would make the internet far less user-friendly.
            </p>
          </li>
          <li>
            <strong>Security: Protecting the Integrity of the Internet</strong>
            <p>
              Security is one of the most critical aspects of maintaining the internet. The internet is a prime target for cybercriminals, who attempt to steal personal data, launch malware attacks, and compromise the integrity of services. To counteract these threats, several security mechanisms are in place:
            </p>
            <ul>
              <li><strong>Encryption:</strong> The process of encoding information so that only authorized users can access it. SSL/TLS encryption ensures that data transmitted between your browser and websites is secure, especially during online transactions.</li>
              <li><strong>Firewalls:</strong> These act as a barrier between your device and the internet, blocking harmful or unauthorized traffic.</li>
              <li><strong>Cybersecurity Standards:</strong> Organizations like the Internet Engineering Task Force (IETF) and Internet Society (ISOC) play an important role in developing internet security standards that prevent vulnerabilities and protect users.</li>
            </ul>
          </li>
        </ol>
      </section>

      <section className="role">
        <h2>The Role of The Internet Society in Supporting the Internet</h2>
        <p>
          The Internet Society plays a crucial role in fostering the development and maintenance of the internet through its advocacy, policy work, and support of open standards. Here are some ways ISOC contributes to the global internet ecosystem:
        </p>
        <ul>
          <li><strong>Advocacy for Internet Access and Policy:</strong> ISOC advocates for universal and affordable internet access. They work with governments, industry leaders, and international organizations to shape policies that enable people around the world to connect to the internet.</li>
          <li><strong>Promoting Internet Standards:</strong> The IETF and other organizations like W3C (World Wide Web Consortium) and IEEE develop technical standards that ensure the internet remains interoperable and efficient.</li>
          <li><strong>Global Cooperation and Governance:</strong> ISOC is a leading voice in global internet governance, supporting the Internet Governance Forum (IGF) and promoting the multistakeholder model of internet governance.</li>
          <li><strong>Supporting Education and Research:</strong> ISOC funds and supports research initiatives aimed at improving internet access and security through scholarships, grants, and partnerships with universities.</li>
        </ul>
      </section>

      <section className="collaboration">
        <h2>What the Internet Needs to Exist: A Collaborative Effort</h2>
        <p>
          The internet is a powerful, dynamic, and constantly evolving system that requires ongoing collaboration between many different stakeholders: governments, private companies, civil society, and technical organizations. The Internet Society helps bring these diverse groups together to ensure that the internet remains a free, open, and secure resource for everyone.
        </p>
        <p>
          As we look to the future, the internet will continue to evolve with new technologies and challenges, from artificial intelligence to global cybersecurity threats. It’s up to organizations like the Internet Society, along with individuals like you, to help ensure that the internet remains a tool for good—a space where innovation, creativity, and human connection can thrive.
        </p>
      </section>

      <section className="call-to-action">
        <h2>Call to Action:</h2>
        <p>
          Interested in learning more about the future of the internet? Stay informed by exploring our <a href="/resources">Internet Society Resources</a> or join us in supporting open internet policies by becoming a member of the <a href="/join">Internet Society</a>.
        </p>
      </section>
    </div>
  );
};

export default App;
