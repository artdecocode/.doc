const Footer = ({ client, clientLink, clientLogo }) => {
  return (<table>
  <tr>
    <th>
      <a href="https://www.artd.eco">
        <img width="100" src="https://raw.githubusercontent.com/wrote/wrote/master/images/artdeco.png" alt="Art Deco"/>
      </a>
    </th>
    <th>
      © <a href="https://artd.eco">Art Deco™</a> {client && `for`} {client && <a href={clientLink}>{client}</a>}
      {` ${new Date().getFullYear()}`}
    </th>{
      client && clientLogo &&
      <th>
        <a href={clientLink}>
          <img width="100" width="100" src={clientLogo} alt={client}/>
        </a>
      </th>}
  </tr>
</table>)
}

export default Footer