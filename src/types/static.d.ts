interface Iinformation {
  Title: string;
  subTitle: string;
  context: string;
  img: string;
}

interface IPrice {
  bgColor: string;
  title: string;
  price: string;
  textColor?: string;
  features: (string | JSX.Element)[];
  bottomColor: string;
}

interface IstaticUser {
  title: string;
  subTitle: string;
  imgUrl: string;
  context: string | JSX.Element;
}

interface IHocWrapper {}
