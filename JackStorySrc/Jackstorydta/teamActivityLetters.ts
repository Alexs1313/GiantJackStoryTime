import { ImageSourcePropType } from 'react-native';

const LETTER_IMAGES: Record<string, ImageSourcePropType> = {
  A: require('../JackStoryAssets/images/team_letter_A.png'),
  B: require('../JackStoryAssets/images/team_letter_B.png'),
  C: require('../JackStoryAssets/images/team_letter_C.png'),
  D: require('../JackStoryAssets/images/team_letter_D.png'),
  E: require('../JackStoryAssets/images/team_letter_E.png'),
  F: require('../JackStoryAssets/images/team_letter_F.png'),
  G: require('../JackStoryAssets/images/team_letter_G.png'),
  H: require('../JackStoryAssets/images/team_letter_H.png'),
  I: require('../JackStoryAssets/images/team_letter_I.png'),
  J: require('../JackStoryAssets/images/team_letter_J.png'),
  K: require('../JackStoryAssets/images/team_letter_k.png'),
  L: require('../JackStoryAssets/images/team_letter_l.png'),
  M: require('../JackStoryAssets/images/team_letter_m.png'),
  N: require('../JackStoryAssets/images/team_letter_n.png'),
  O: require('../JackStoryAssets/images/team_letter_o.png'),
  P: require('../JackStoryAssets/images/team_letter_p.png'),
  Q: require('../JackStoryAssets/images/team_letter_q.png'),
  R: require('../JackStoryAssets/images/team_letter_r.png'),
  S: require('../JackStoryAssets/images/team_letter_s.png'),
  T: require('../JackStoryAssets/images/team_letter_t.png'),
  U: require('../JackStoryAssets/images/team_letter_u.png'),
  V: require('../JackStoryAssets/images/team_letter_v.png'),
  W: require('../JackStoryAssets/images/team_letter_w.png'),
  X: require('../JackStoryAssets/images/team_letter_x.png'),
  Y: require('../JackStoryAssets/images/team_letter_y.png'),
  Z: require('../JackStoryAssets/images/team_letter_z.png'),
};

export const LETTERS_WITH_IMAGES = Object.keys(LETTER_IMAGES);

export const getRandomLetter = (): string => {
  return LETTERS_WITH_IMAGES[
    Math.floor(Math.random() * LETTERS_WITH_IMAGES.length)
  ];
};

export const getLetterImage = (letter: string): ImageSourcePropType | null => {
  return LETTER_IMAGES[letter] ?? null;
};
