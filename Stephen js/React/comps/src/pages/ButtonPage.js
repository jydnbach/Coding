import { GoBell, GoDatabase, GoCloudDownload } from "react-icons/go";
import Button from "../components/Button";

function ButtonPage() {
  const handleClick = () => {};
  return (
    <div>
      <div>
        <Button success rounded onClick={handleClick} className="mb-5">
          <GoBell />
          click
        </Button>
      </div>
      <div>
        <Button danger onMouseEnter={handleClick}>
          <GoCloudDownload />
          But Now
        </Button>
      </div>
      <div>
        <Button warning>
          <GoDatabase />
          See Deal
        </Button>
      </div>
      <div>
        <Button secondary outline rounded>
          Hide ads
        </Button>
      </div>
      <div>
        <Button primary rounded>
          something
        </Button>
      </div>
    </div>
  );
}

export default ButtonPage;
