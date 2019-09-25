package br.com.condominio.condominio.domain;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter @Builder @NoArgsConstructor @AllArgsConstructor
public class Morador {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String nome;
	private String email;
	private String tipo;
	private String telefone;
	private String celular1;
	private String celular2;
	private Boolean enviarNotificacaoEmail;
	private Boolean enviarNotificacaoPush;
	private String responsavel;
	private Date dataInicio;
	private Date dataFim;
	@ManyToOne
	private Unidade unidade;
}
