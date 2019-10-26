package br.com.condominio.condominio.service;

import java.util.List;

import br.com.condominio.condominio.dto.UsuarioDTO;
import br.com.condominio.condominio.model.Usuario;

public interface UsuarioService {


	public UsuarioDTO salvar(UsuarioDTO usuarioDTO);
	
	public UsuarioDTO alterar(Long id, UsuarioDTO usuarioDTO);
	
	public void deletar(Long id);
	
	public List<UsuarioDTO> listar();
	
	public UsuarioDTO buscarPorEmail(String email);
	
	public Usuario buscarUsuarioPorEmail(String email);
	
	public UsuarioDTO buscar(Long id);

}
