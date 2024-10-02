import React from 'react';
import SidebarTutor from './SidebarTutor';
import './assets/tutor.css';  // Import the updated CSS

const TutorialPage = () => {
  return (
    <div className='mt-5'>
      <SidebarTutor />
      <div className="main-content">
        {/* Main Content Area */}
        <h1>Turtle Graphics in Python</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque repudiandae, in atque quas culpa repellendus facilis illum dolore non adipisci pariatur voluptates quisquam nam dicta optio commodi molestias iste tempora?Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, quis perspiciatis. Magnam blanditiis est, officiis, assumenda vitae voluptatem repellendus ducimus illum culpa, sit impedit animi rerum inventore! Officia, soluta eius?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere nobis eligendi et velit vel consequatur modi magnam ullam, minus placeat dignissimos itaque expedita, suscipit vero! Aliquid velit saepe vero earum?
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe sint rerum corrupti consectetur mollitia atque sit voluptatibus expedita enim accusamus, repudiandae dignissimos, laborum tempora. Facilis enim animi ea. Vel, unde.
        </p>

        {/* Embedding Trinket */}
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', maxWidth: '100%', background: '#ccc', marginBottom: '20px' }}>
          <iframe src="https://trinket.io/embed/python/33e5c3b81b" width="100%" height="356" frameBorder="0" marginWidth="0" marginHeight="0" allowFullScreen></iframe>
        </div>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero saepe numquam quasi explicabo molestiae accusamus neque fugit atque enim quam quidem ipsa asperiores est amet, ad nihil quaerat, iure sit.
        </p>
      </div>
    </div>
  );
};

export default TutorialPage;
