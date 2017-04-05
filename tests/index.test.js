import { Selector } from 'testcafe'

fixture(`Index page`)
  .page('http://localhost:8080')

test('Title contains Vue demo', async t => {
  const navbar = await new Selector('.navbar-brand')
  await t
    .expect(navbar.innerText).eql('Vue demo')
})

test('User can search', async t => {
  const search = await new Selector('.search')
  await t
    .typeText(search, 'Test')
    .expect(search.value).eql('Test')
})