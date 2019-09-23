package br.com.condominio.condominio.resource;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import br.com.condominio.condominio.domain.Usuario;

@RestController
public class UsuarioResource {

	private List<Usuario> usuarios;

	public UsuarioResource() {
		usuarios = new ArrayList<Usuario>();
		usuarios.add(Usuario.builder().cpf("12345678901").id(1L).nome("Primeiro").telefone("1111-1111")
				.celular1("8888-8888").perfis("perfil1|perfil2").build());
		usuarios.add(Usuario.builder().cpf("98765432101").id(2L).nome("Segundo").telefone("2222-2222")
				.celular1("9999-9999").perfis("perfil1").build());
	}

	@RequestMapping(value = "/usuarios", method = RequestMethod.GET)
	public ResponseEntity<List<Usuario>> listar() {
		return new ResponseEntity<List<Usuario>>(usuarios, HttpStatus.OK);
	}

}
