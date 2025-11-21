export const SCENES = {
   start: [
    { character: 'Казума', text: 'Эй, Аква!'},
    { character: 'Аква', text: 'Да Казума?'},
    { character: 'Аква', text: 'Стой Казума, можешь мне помочь?'},
    { character: 'Казума', text: '[Помочь?]', choices: [
      {text: 'Помочь!', next: "new_branch"}
    ]}
   ],

   new_branch: [
    { character: 'Казума', text: 'Хорошо, помогу...'}
   ]

   
};