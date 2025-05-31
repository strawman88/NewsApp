import Image from 'next/image';
import Link from 'next/link';

import notFound from '../../public/images/notFound.png'

const NotFoundPage = () => {
  return (
    <div className="notFoundBox">
      <div className="twinBox">
        <span>
          <Image 
            src={notFound}
            alt="not found 404" 
            height="250"
            width="400"
          />
        </span>
        <div>
          <h1>Sorry this page cannot be found</h1>
          <Link href="/">Return Home</Link>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage