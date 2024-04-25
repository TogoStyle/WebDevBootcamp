import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const masterKey = "4VGP2DN-6EWM4SJ-N6FGRHV-Z3PR3TT";

app.use(bodyParser.urlencoded({ extended: true }));

//1. GET a random book
// app.get("/books/random", (req, res)=> {
//   const type = req.query.type;
//   const randomIndex = Math.floor(Math.random() * books.length);
//   res.json(books[randomIndex]);
// })

// Definimos la ruta para obtener un recurso aleatorio (libro o cita) según el tipo especificado por el usuario
app.get("/random/:type", (req, res) => {
  const type = req.params.type; // Obtenemos el tipo de recurso de la consulta

  let resource; // Variable para almacenar el recurso aleatorio

  // Verificamos el tipo de recurso solicitado por el usuario
  if (type === 'books') {
      // Si el usuario solicita un libro, seleccionamos uno aleatorio del arreglo de libros
      resource = books[Math.floor(Math.random() * books.length)];
  } else if (type === 'quotes') {
      // Si el usuario solicita una cita, seleccionamos una cita aleatoria del arreglo de citas
      resource = quotes[Math.floor(Math.random() * quotes.length)];
  } else {
      // Si el usuario no especifica un tipo válido, enviamos un mensaje de error
      return res.status(400).json({ error: 'Por favor, especifica un tipo válido: "book" o "quote"' });
  }

  // Enviamos el recurso aleatorio como respuesta
  res.json(resource);
});




//3. GET books by filtering on the book author
app.get("/:type/filter/", (req, res)=> {
  const type = req.params.type;
  const author = req.query.author;
  let resource;

  if (type === 'books') {
    resource = books.filter((book) => book.author === author);
} else if (type === 'quotes') {
    resource = quotes.filter((quote) => quote.author === author);
} else {
    return res.status(400).json({ error: 'Por favor, especifica un tipo válido: "book" o "quote"' });
}

// Verificamos si se encontró el recurso
if (!resource) {
  return res.status(404).json({ error: `No se encontró ${type.slice(0, -1)} con el Author ${author}` });
}

res.json(resource);

})

  //2. GET a specific book or quote
app.get("/:type/:id", (req, res)=> {
  const type = req.params.type;
  const id = parseInt(req.params.id);
  let resource;

  if (type === 'books') {
    resource = books.find(book => book.id === id);
} else if (type === 'quotes') {
    resource = quotes.find(quote => quote.id === id);
} else {
    return res.status(400).json({ error: 'Por favor, especifica un tipo válido: "book" o "quote"' });
}

// Verificamos si se encontró el recurso
if (!resource) {
  return res.status(404).json({ error: `No se encontró ${type.slice(0, -1)} con el ID ${id}` });
}

res.json(resource);

})


//4. POST a new joke

//5. PUT a joke

//6. PATCH a joke

//7. DELETE Specific joke

//8. DELETE All jokes

app.listen(port, () => {
  console.log(`Successfully started server on port ${port}.`);
});

const books = [
  { id: 1, bookName: 'Meditations', author: 'Marcus Aurelius' },
  { id: 2, bookName: 'Letters to Lucilius', author: 'Seneca' },
  { id: 3, bookName: 'Discourses', author: 'Epictetus' },
  { id: 4, bookName: 'The Art of Happiness', author: 'Dalai Lama' },
  { id: 5, bookName: 'Discourses of Epictetus', author: 'Arrian' },
  { id: 6, bookName: 'Enchiridion', author: 'Epictetus' },
  { id: 7, bookName: 'On the Happy Life', author: 'Seneca' },
  { id: 8, bookName: 'On the Nature of Things', author: 'Seneca' },
  { id: 9, bookName: 'The Manual', author: 'Epictetus' },
  { id: 10, bookName: 'The Art of Living', author: 'Epictetus' },
  { id: 11, bookName: 'The Short Happy Life of Seneca', author: 'Paula Canto' },
  { id: 12, bookName: 'Stoic Writings', author: 'Rufus' },
  { id: 13, bookName: 'On the Shortness of Life', author: 'Seneca' },
  { id: 14, bookName: 'Happiness, Death, and Other Essays', author: 'Seneca' },
  { id: 15, bookName: 'On the Firmness of the Wise', author: 'Seneca' },
  { id: 16, bookName: 'Seneca to Go Beyond the Journey', author: 'Marina Garcés' },
  { id: 17, bookName: 'Epictetus for a Better Life', author: 'Daniel Utrilla' },
  { id: 18, bookName: 'In Search of Happiness', author: 'Bettany Hughes' },
  { id: 19, bookName: 'Stoic Wisdom', author: 'Pierre Hadot' },
  { id: 20, bookName: 'The Art of Living', author: 'Epictetus' },
  { id: 21, bookName: 'The Obstacle Is the Way', author: 'Ryan Holiday' },
  { id: 22, bookName: 'Ego Is the Enemy', author: 'Ryan Holiday' },
  { id: 23, bookName: 'Stillness Is the Key', author: 'Ryan Holiday' },
  { id: 24, bookName: 'The Daily Stoic', author: 'Ryan Holiday' },
  { id: 25, bookName: 'How to Think Like a Roman Emperor', author: 'Donald Robertson' },
  { id: 26, bookName: 'Stoicism and the Art of Happiness', author: 'Donald Robertson' },
  { id: 27, bookName: 'The Stoic Challenge', author: 'William B. Irvine' },
  { id: 28, bookName: 'A Guide to the Good Life', author: 'William B. Irvine' },
  { id: 29, bookName: 'Stoicism: A Very Short Introduction', author: 'Brad Inwood' },
  { id: 30, bookName: 'The Stoic Heart', author: 'Beverley Sedlick' },
  { id: 31, bookName: 'Stoicism: The Ultimate Guide', author: 'Ryan James' },
  { id: 32, bookName: 'How to Be a Stoic', author: 'Massimo Pigliucci' },
  { id: 33, bookName: 'The Practicing Stoic', author: 'Ward Farnsworth' },
  { id: 34, bookName: 'Stoicism: What Can Stoicism Teach You', author: 'Ryan James' },
  { id: 35, bookName: 'The Stoic: 9 Principles', author: 'John Collins' },
  { id: 36, bookName: 'The Little Book of Stoicism', author: 'Jonas Salzgeber' },
  { id: 37, bookName: 'Stoicism: A Stoic\'s Journey', author: 'Garry Hudson' },
  { id: 38, bookName: 'The Stoic Path', author: 'William Ferraiolo' },
  { id: 39, bookName: 'Stoicism: Unlock the Secrets', author: 'Ryan James' },
  { id: 40, bookName: 'The Stoic Challenge', author: 'William B. Irvine' },
  { id: 41, bookName: 'The Stoic Journal', author: 'Chuck Chakrapani' },
  { id: 42, bookName: 'Stoicism: Understanding and Practicing', author: 'Kyle Faber' },
  { id: 43, bookName: 'The Stoic Warrior', author: 'Charles River Editors' },
  { id: 44, bookName: 'The Meditations of Marcus Aurelius', author: 'Marcus Aurelius' },
  { id: 45, bookName: 'Stoicism and the Art of Happiness', author: 'Donald Robertson' },
  { id: 46, bookName: 'The Daily Stoic Journal', author: 'Ryan Holiday and Stephen Hanselman' },
  { id: 47, bookName: 'Stoic Six Pack 2', author: 'Lucius Annaeus Seneca, Epictetus, Musonius Rufus, Hierocles, Marcus Aurelius' },
  { id: 48, bookName: 'The Complete Works of Epictetus', author: 'Epictetus' },
  { id: 49, bookName: 'Letters from a Stoic', author: 'Lucius Annaeus Seneca' },
  { id: 50, bookName: 'The Discourses of Epictetus', author: 'Epictetus' },
  { id: 51, bookName: 'The Enchiridion of Epictetus', author: 'Epictetus' },
  { id: 52, bookName: 'Stoicism and the Art of Happiness', author: 'Donald Robertson' },
  { id: 53, bookName: 'The Stoic Philosophy of Marcus Aurelius', author: 'Marcus Aurelius' },
  { id: 54, bookName: 'The Stoic Challenge', author: 'William B. Irvine' },
  { id: 55, bookName: 'The Obstacle Is the Way', author: 'Ryan Holiday' },
  { id: 56, bookName: 'A Guide to the Good Life', author: 'William B. Irvine' },
  { id: 57, bookName: 'The Daily Stoic', author: 'Ryan Holiday' },
  { id: 58, bookName: 'The Practicing Stoic', author: 'Ward Farnsworth' },
  { id: 59, bookName: 'Stoicism', author: 'Ryan James' },
  { id: 60, bookName: 'Stillness Is the Key', author: 'Ryan Holiday' },
  { id: 61, bookName: 'Ego Is the Enemy', author: 'Ryan Holiday' },
  { id: 62, bookName: 'How to Think Like a Roman Emperor', author: 'Donald Robertson' },
  { id: 63, bookName: 'The Stoic Heart', author: 'Beverley Sedlick' },
  { id: 64, bookName: 'The Little Book of Stoicism', author: 'Jonas Salzgeber' },
  { id: 65, bookName: 'Stoicism', author: 'Brad Inwood' },
  { id: 66, bookName: 'The Stoic Life', author: 'Tad Brennan' },
  { id: 67, bookName: 'Stoicism', author: 'Sharon Nash' },
  { id: 68, bookName: 'The Daily Stoic Journal', author: 'Ryan Holiday and Stephen Hanselman' },
  { id: 69, bookName: 'Stoicism', author: 'Erik Smith' },
  { id: 70, bookName: 'Stoicism', author: 'Jimmie Powell' },
  { id: 71, bookName: 'Stoicism', author: 'Jordan White' },
  { id: 72, bookName: 'Stoicism', author: 'Ryan James' },
  { id: 73, bookName: 'Stoicism', author: 'Gregory Moto' },
  { id: 74, bookName: 'Stoicism', author: 'Russell Davis' },
  { id: 75, bookName: 'The Stoic Challenge', author: 'Stephen Hanselman' },
  { id: 76, bookName: 'Stoicism', author: 'Brian Sandler' },
  { id: 77, bookName: 'Stoicism', author: 'A.C. Drexel' },
  { id: 78, bookName: 'Stoicism', author: 'G. S. Marone' },
  { id: 79, bookName: 'Stoicism', author: 'George Tanner' },
  { id: 80, bookName: 'Stoicism', author: 'John Nash' },
  { id: 81, bookName: 'Stoicism', author: 'Bryan Patton' },
  { id: 82, bookName: 'Stoicism', author: 'Kevin Garnett' },
  { id: 83, bookName: 'Stoicism', author: 'Max Freeman' },
  { id: 84, bookName: 'Stoicism', author: 'Chris Tansy' },
  { id: 85, bookName: 'Stoicism', author: 'Mark T. M. Pillinger' },
  { id: 86, bookName: 'Stoicism', author: 'Steve Ewing' },
  { id: 87, bookName: 'Stoicism', author: 'Dylan Campbell' },
  { id: 88, bookName: 'Stoicism', author: 'Aria P' },
  { id: 89, bookName: 'Stoicism', author: 'Russell Davis' },
  { id: 90, bookName: 'Stoicism', author: 'Aria P' },
  { id: 91, bookName: 'Stoicism', author: 'Kyle Faber' },
  { id: 92, bookName: 'Stoicism', author: 'Tom Miles' },
  { id: 93, bookName: 'Stoicism', author: 'Robert Leary' },
  { id: 94, bookName: 'Stoicism', author: 'Russell Davis' },
  { id: 95, bookName: 'Stoicism', author: 'Aria P' },
  { id: 96, bookName: 'Stoicism', author: 'Kyle Faber' },
  { id: 97, bookName: 'Stoicism', author: 'Tom Miles' },
  { id: 98, bookName: 'Stoicism', author: 'Robert Leary' },
  { id: 99, bookName: 'Stoicism', author: 'Aria P' },
  { id: 100, bookName: 'Stoicism', author: 'Kyle Faber' }
];

const quotes = [
  { id: 1, quote: 'The happiness of your life depends upon the quality of your thoughts.', author: 'Marcus Aurelius' },
  { id: 2, quote: 'Wealth consists not in having great possessions, but in having few wants.', author: 'Epictetus' },
  { id: 3, quote: 'He is a wise man who does not grieve for the things which he has not, but rejoices for those which he has.', author: 'Epictetus' },
  { id: 4, quote: 'The key is to keep company only with people who uplift you, whose presence calls forth your best.', author: 'Epictetus' },
  { id: 5, quote: 'Don’t explain your philosophy. Embody it.', author: 'Epictetus' },
  { id: 6, quote: 'No man is free who is not a master of himself.', author: 'Epictetus' },
  { id: 7, quote: 'The best revenge is to be unlike him who performed the injury.', author: 'Marcus Aurelius' },
  { id: 8, quote: 'It is not death that a man should fear, but he should fear never beginning to live.', author: 'Marcus Aurelius' },
  { id: 9, quote: 'Waste no more time arguing about what a good man should be. Be one.', author: 'Marcus Aurelius' },
  { id: 10, quote: 'The universe is change; our life is what our thoughts make it.', author: 'Marcus Aurelius' },
  { id: 11, quote: 'Very little is needed to make a happy life; it is all within yourself, in your way of thinking.', author: 'Marcus Aurelius' },
  { id: 12, quote: 'Do every act of your life as if it were your last.', author: 'Marcus Aurelius' },
  { id: 13, quote: 'The more we value things outside our control, the less control we have.', author: 'Epictetus' },
  { id: 14, quote: 'Difficulty shows what men are.', author: 'Epictetus' },
  { id: 15, quote: 'First say to yourself what you would be; and then do what you have to do.', author: 'Epictetus' },
  { id: 16, quote: 'Freedom is the only worthy goal in life. It is won by disregarding things that lie beyond our control.', author: 'Epictetus' },
  { id: 17, quote: 'The only wealth which you will keep forever is the wealth you have given away.', author: 'Marcus Aurelius' },
  { id: 18, quote: 'The soul becomes dyed with the color of its thoughts.', author: 'Marcus Aurelius' },
  { id: 19, quote: 'You have power over your mind – not outside events. Realize this, and you will find strength.', author: 'Marcus Aurelius' },
  { id: 20, quote: 'Accept the things to which fate binds you, and love the people with whom fate brings you together, but do so with all your heart.', author: 'Marcus Aurelius' },
  { id: 21, quote: 'If you are distressed by anything external, the pain is not due to the thing itself, but to your estimate of it; and this you have the power to revoke at any moment.', author: 'Marcus Aurelius' },
  { id: 22, quote: 'Nothing happens to anybody which he is not fitted by nature to bear.', author: 'Marcus Aurelius' },
  { id: 23, quote: 'When you arise in the morning think of what a privilege it is to be alive, to think, to enjoy, to love.', author: 'Marcus Aurelius' },
  { id: 24, quote: 'It is not the man who has too little, but the man who craves more, that is poor.', author: 'Seneca' },
  { id: 25, quote: 'Luck is what happens when preparation meets opportunity.', author: 'Seneca' },
  { id: 26, quote: 'True happiness is to enjoy the present, without anxious dependence upon the future.', author: 'Seneca' },
  { id: 27, quote: 'Begin at once to live, and count each separate day as a separate life.', author: 'Seneca' },
  { id: 28, quote: 'The whole future lies in uncertainty: live immediately.', author: 'Seneca' },
  { id: 29, quote: 'He who is brave is free.', author: 'Seneca' },
  { id: 30, quote: 'Life is like a play: it’s not the length, but the excellence of the acting that matters.', author: 'Seneca' },
  { id: 31, quote: 'We suffer more often in imagination than in reality.', author: 'Seneca' },
  { id: 32, quote: 'We should always allow some time to elapse, for time discloses the truth.', author: 'Seneca' },
  { id: 33, quote: 'Wealth consists not in having great possessions, but in having few wants.', author: 'Epictetus' },
  { id: 34, quote: 'Freedom is the only worthy goal in life. It is won by disregarding things that lie beyond our control.', author: 'Epictetus' },
  { id: 35, quote: 'He is a wise man who does not grieve for the things which he has not, but rejoices for those which he has.', author: 'Epictetus' },
  { id: 36, quote: 'Difficulties show men what they are. In case of any difficulty, remember that God has pitted you against a rough antagonist that you may be a conqueror, and this cannot be without toil.', author: 'Epictetus' },
  { id: 37, quote: 'If anyone tells you that a certain person speaks ill of you, do not make excuses about what is said of you but answer, "He was ignorant of my other faults, else he would not have mentioned these alone."', author: 'Epictetus' },
  { id: 38, quote: 'Men are disturbed not by things, but by the views which they take of them.', author: 'Epictetus' },
  { id: 39, quote: 'When you are offended at any man’s fault, turn to yourself and study your own failings. Then you will forget your anger.', author: 'Epictetus' },
  { id: 40, quote: 'People are not disturbed by things, but by the views they take of them.', author: 'Epictetus' },
  { id: 41, quote: 'There is only one way to happiness and that is to cease worrying about things which are beyond the power of our will.', author: 'Epictetus' },
  { id: 42, quote: 'He who laughs at himself never runs out of things to laugh at.', author: 'Epictetus' },
  { id: 43, quote: 'First say to yourself what you would be; and then do what you have to do.', author: 'Epictetus' },
  { id: 44, quote: 'If you want to improve, be content to be thought foolish and stupid.', author: 'Epictetus' },
  { id: 45, quote: 'Caretake this moment. Immerse yourself in its particulars. Respond to this person, this challenge, this deed. Quit evasions. Stop giving yourself needless trouble. It is time to really live; to fully inhabit the situation you happen to be in now.', author: 'Epictetus' },
  { id: 46, quote: 'Wealth consists not in having great possessions, but in having few wants.', author: 'Epictetus' },
  { id: 47, quote: 'Difficulties show men what they are. In case of any difficulty, remember that God has pitted you against a rough antagonist that you may be a conqueror, and this cannot be without toil.', author: 'Epictetus' },
  { id: 48, quote: 'If anyone tells you that a certain person speaks ill of you, do not make excuses about what is said of you but answer, "He was ignorant of my other faults, else he would not have mentioned these alone."', author: 'Epictetus' },
  { id: 49, quote: 'Men are disturbed not by things, but by the views which they take of them.', author: 'Epictetus' },
  { id: 50, quote: 'When you are offended at any man’s fault, turn to yourself and study your own failings. Then you will forget your anger.', author: 'Epictetus' },
  { id: 51, quote: 'People are not disturbed by things, but by the views they take of them.', author: 'Epictetus' },
  { id: 52, quote: 'There is only one way to happiness and that is to cease worrying about things which are beyond the power of our will.', author: 'Epictetus' },
  { id: 53, quote: 'He who laughs at himself never runs out of things to laugh at.', author: 'Epictetus' },
  { id: 54, quote: 'First say to yourself what you would be; and then do what you have to do.', author: 'Epictetus' },
  { id: 55, quote: 'If you want to improve, be content to be thought foolish and stupid.', author: 'Epictetus' },
  { id: 56, quote: 'Caretake this moment. Immerse yourself in its particulars. Respond to this person, this challenge, this deed. Quit evasions. Stop giving yourself needless trouble. It is time to really live; to fully inhabit the situation you happen to be in now.', author: 'Epictetus' },
  { id: 57, quote: 'If it is not right, do not do it, if it is not true, do not say it.', author: 'Marcus Aurelius' },
  { id: 58, quote: 'Waste no more time arguing about what a good man should be. Be one.', author: 'Marcus Aurelius' },
  { id: 59, quote: 'Dwell on the beauty of life. Watch the stars, and see yourself running with them.', author: 'Marcus Aurelius' },
  { id: 60, quote: 'The best revenge is to be unlike him who performed the injury.', author: 'Marcus Aurelius' },
  { id: 61, quote: 'The soul becomes dyed with the color of its thoughts.', author: 'Marcus Aurelius' },
  { id: 62, quote: 'You have power over your mind - not outside events. Realize this, and you will find strength.', author: 'Marcus Aurelius' },
  { id: 63, quote: 'Very little is needed to make a happy life; it is all within yourself, in your way of thinking.', author: 'Marcus Aurelius' },
  { id: 64, quote: 'When you arise in the morning think of what a privilege it is to be alive, to think, to enjoy, to love.', author: 'Marcus Aurelius' },
  { id: 65, quote: 'The impediment to action advances action. What stands in the way becomes the way.', author: 'Marcus Aurelius' },
  { id: 66, quote: 'The whole future lies in uncertainty: live immediately.', author: 'Seneca' },
  { id: 67, quote: 'Luck is what happens when preparation meets opportunity.', author: 'Seneca' },
  { id: 68, quote: 'True happiness is to enjoy the present, without anxious dependence upon the future.', author: 'Seneca' },
  { id: 69, quote: 'Begin at once to live, and count each separate day as a separate life.', author: 'Seneca' },
  { id: 70, quote: 'We suffer more often in imagination than in reality.', author: 'Seneca' },
  { id: 71, quote: 'We should always allow some time to elapse, for time discloses the truth.', author: 'Seneca' },
  { id: 72, quote: 'We should give as we would receive, cheerfully, quickly, and without hesitation; for there is no grace in a benefit that sticks to the fingers.', author: 'Seneca' },
  { id: 73, quote: 'No man was ever wise by chance.', author: 'Seneca' },
  { id: 74, quote: 'A gem cannot be polished without friction, nor a man perfected without trials.', author: 'Seneca' },
  { id: 75, quote: 'Wealth consists not in having great possessions, but in having few wants.', author: 'Seneca' },
  { id: 76, quote: 'Difficulties show men what they are. In case of any difficulty, remember that God has pitted you against a rough antagonist that you may be a conqueror, and this cannot be without toil.', author: 'Seneca' },
  { id: 77, quote: 'If anyone tells you that a certain person speaks ill of you, do not make excuses about what is said of you but answer, "He was ignorant of my other faults, else he would not have mentioned these alone."', author: 'Seneca' },
  { id: 78, quote: 'Men are disturbed not by things, but by the views which they take of them.', author: 'Seneca' },
  { id: 79, quote: 'When you are offended at any man’s fault, turn to yourself and study your own failings. Then you will forget your anger.', author: 'Seneca' },
  { id: 80, quote: 'People are not disturbed by things, but by the views they take of them.', author: 'Seneca' },
  { id: 81, quote: 'There is only one way to happiness and that is to cease worrying about things which are beyond the power of our will.', author: 'Seneca' },
  { id: 82, quote: 'He who laughs at himself never runs out of things to laugh at.', author: 'Seneca' },
  { id: 83, quote: 'First say to yourself what you would be; and then do what you have to do.', author: 'Seneca' },
  { id: 84, quote: 'If you want to improve, be content to be thought foolish and stupid.', author: 'Seneca' },
  { id: 85, quote: 'Caretake this moment. Immerse yourself in its particulars. Respond to this person, this challenge, this deed. Quit evasions. Stop giving yourself needless trouble. It is time to really live; to fully inhabit the situation you happen to be in now.', author: 'Seneca' },
  { id: 86, quote: 'If it is not right, do not do it, if it is not true, do not say it.', author: 'Seneca' },
  { id: 87, quote: 'Waste no more time arguing about what a good man should be. Be one.', author: 'Seneca' },
  { id: 88, quote: 'Dwell on the beauty of life. Watch the stars, and see yourself running with them.', author: 'Seneca' },
  { id: 89, quote: 'The best revenge is to be unlike him who performed the injury.', author: 'Seneca' },
  { id: 90, quote: 'The soul becomes dyed with the color of its thoughts.', author: 'Seneca' },
  { id: 91, quote: 'You have power over your mind - not outside events. Realize this, and you will find strength.', author: 'Seneca' },
  { id: 92, quote: 'Very little is needed to make a happy life; it is all within yourself, in your way of thinking.', author: 'Seneca' },
  { id: 93, quote: 'When you arise in the morning think of what a privilege it is to be alive, to think, to enjoy, to love.', author: 'Seneca' },
  { id: 94, quote: 'The impediment to action advances action. What stands in the way becomes the way.', author: 'Seneca' },
  { id: 95, quote: 'The mind that is anxious about future events is miserable.', author: 'Seneca' },
  { id: 96, quote: 'Luck is what happens when preparation meets opportunity.', author: 'Seneca' },
  { id: 97, quote: 'True happiness is to enjoy the present, without anxious dependence upon the future.', author: 'Seneca' },
  { id: 98, quote: 'Begin at once to live, and count each separate day as a separate life.', author: 'Seneca' },
  { id: 99, quote: 'We suffer more often in imagination than in reality.', author: 'Seneca' },
  { id: 100, quote: 'We should always allow some time to elapse, for time discloses the truth.', author: 'Seneca' }
];

