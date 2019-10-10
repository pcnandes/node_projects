package br.com.condominio.condominio.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioDTO {

	private Long id;
	private String email;
	private String senha;
	private String cpf;
	private String nome;
	private String telefone;
	private String celular1;
	private String celular2;

}
