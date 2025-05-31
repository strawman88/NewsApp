import Image from 'next/image';

function ExampleImages() {
  return (
    <div>
      <Image
        src="/backgrounds/earth.jpg"
        width={800}
        height={400}
        alt="View of Earth from space"
      />
      <Image
        src="/backgrounds/background.jpg"
        width={800}
        height={400}
        alt="Australian landscape background image"
      />
    </div>
  );
}

export default ExampleImages;